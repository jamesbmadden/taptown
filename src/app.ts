/**
 * Code for the APP page (/app/), where the game actually runs.
 */

import './app.css';
import * as Comlink from 'comlink';
import { mat4, vec2 } from 'gl-matrix';

import vShaderSource from './shaders/shader.vert';
import fShaderSource from './shaders/shader.frag';

import drawTile, { init as initDrawTiles } from './drawTile';
import Camera from './camera';
import { updateUIFromProperties } from './ui';

import loadDb, { getSave, GameSave } from './db';

// load workers
// @ts-expect-error
import _Ambient from './workers/ambient?worker';
// @ts-expect-error
import _Buildings from './workers/buildings?worker';
// @ts-expect-error
import _People from './workers/people?worker';

// global variables
let ambient;
let buildings;
let people;
const canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
// how many buildings should fit on-screen horizontally (an iPhone should roughly show 2 for reference)
// each building is 2 x/z for reference
let buildingsPerRow = 2 * (innerWidth / 200);
let buildingsPerColumn = 2 * (innerHeight / 200);
// map of the world - which buildings go where, etc
let map: Uint16Array;
// the size of the map (how many buildings per row/column)
let mapSize: number;
// x and z position, which will be changed by either swiping or clicking and dragging
let camera = new Camera();

// provide the camera object on window for easier debugging
// @ts-expect-error
window.camera = camera;

canvas.width = innerWidth;
canvas.height = innerHeight;
// make sure camera knows how to adjust between device pixels and WebGL tiles
let ratioX = innerWidth / buildingsPerRow;
let ratioY = innerHeight / buildingsPerColumn; // calculate buildings per column
camera.setPixelToTileRatio(ratioX, ratioY);

const gl = canvas.getContext('webgl');

// make sure the canvas always matches the window resolution
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  buildingsPerRow = 2 * (innerWidth / 200);
  buildingsPerColumn = 2 * (innerHeight / 200);
  // make sure camera knows how to adjust between device pixels and WebGL tiles
  let ratioX = innerWidth / buildingsPerRow;
  let ratioY = innerHeight / buildingsPerColumn; // calculate buildings per column
  camera.setPixelToTileRatio(ratioX, ratioY);
});

// when the canvas is clicked, find the in-game coords of the location
canvas.addEventListener('click', (event: MouseEvent) => {

  // first, get it based on the X/Y position, THEN change perspective
  // these two have a top-down perspective, and that must be adjusted by 45 degrees on both x and y axes
  const localX = event.clientX / ratioX / 2;
  const localY = event.clientY / ratioY / 2 * 1.425;

  const gameCoords: vec2 = [localX, localY];

  // now use vectors to change perspective
  vec2.rotate(gameCoords, gameCoords, [0, 0], 45 * Math.PI / 180);
  // now it must be adjusted according to the camera's position
  // camera position must be adjusted slightly to match what the screen actually looks like
  // (camera positions, because its for the internal renderer and not game coordinates, need to be halved)
  const cameraCoords: vec2 = [camera.x / 2 + 3.62, camera.z / 2 - 2.62];
  vec2.add(gameCoords, gameCoords, cameraCoords);
  // floor the result 
  vec2.floor(gameCoords, gameCoords);
  // and that's the coordinates! Yay!

  // now update the tile on the map
  const mapCoord = gameCoords[1] * mapSize + gameCoords[0];
  buildings.setTile(gameCoords[0], gameCoords[1], map[mapCoord] + 1);
});

init();

// initate everything before running the game loop
async function init () {

  // Before setting up workers, data must be loaded. Check to see if save ID was provided
  const searchParams = new URLSearchParams(location.search);
  const saveId = searchParams.get('save');

  // if no save ID provided, alert and redirect to landing page
  if (!saveId) {
    alert('Save not provided.');
    location.replace('../');
  }

  // read the database and grab the save
  const db = await loadDb();
  const save = await getSave(db, saveId);

  // if save is null then error
  if (!save) {
    alert('Save couldn\'t be loaded.');
    location.replace('../');
  }
  // otherwise we have the save! Use it to load
  // set the document title to the save name
  document.title = `🏠 ${saveId} • TapTown!`;
  console.log(save);

  // set up workers
  const Ambient: any = Comlink.wrap(new _Ambient());
  Ambient.log();
  const Buildings: any = Comlink.wrap(new _Buildings());
  Buildings.log();
  const People: any = Comlink.wrap(new _People());
  People.log();

  ambient = await new Ambient();
  buildings = await new Buildings(save.map);
  // establish a callback so that any changes to buildings will update the map array
  await buildings.setCallback(Comlink.proxy(newMap => {
    map = newMap;
    mapSize = Math.sqrt(map.length); // maps are square, so this should work?
  }));
  people = await new People();
  // establish a callback so that updates to values will appear in UI
  await people.setCallback(Comlink.proxy(properties => {
    updateUIFromProperties(properties);
  }));

  // now lets get some shaders going
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vShaderSource);
  gl.compileShader(vert);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, fShaderSource);
  gl.compileShader(frag);

  // check for errors
  if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the vert shaders: ' + gl.getShaderInfoLog(vert));
    gl.deleteShader(vert);
    return null;
  }
  if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the frag shaders: ' + gl.getShaderInfoLog(frag));
    gl.deleteShader(frag);
    return null;
  }

  // now compile shaders
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vert);
  gl.attachShader(shaderProgram, frag);
  gl.linkProgram(shaderProgram);

  // check to make sure the shader program linked successfully
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  // get locations for attributes and uniforms
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoordPosition: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      texture: gl.getUniformLocation(shaderProgram, "uTexture")
    },
  };

  // let drawTiles load the models
  await initDrawTiles(gl);

  let lastTime = 0;
  // setup loop and requestAnimationFrame
  const gameLoop = (now) => {

    let delta = now - lastTime;
    // camera must be updated before render to get any moving done
    // camera.update(delta);
    render(programInfo);
    requestAnimationFrame(gameLoop);

    // allow delta to function
    lastTime = now;
    
  }

  requestAnimationFrame(gameLoop);

}

// render
function render (programInfo) {

  gl.clearColor(0, 0, 0, 1);
  gl.clearDepth(1.0);  // Clear everything
  gl.enable(gl.DEPTH_TEST);  // Enable depth testing
  gl.depthFunc(gl.LEQUAL);  // Near things obscure far things
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // create perspective matrix
  const fieldOfView = 90 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientHeight / gl.canvas.clientWidth;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  // make projection matrix isometric
  mat4.ortho(projectionMatrix, 0, buildingsPerRow, 0, buildingsPerRow * aspect, zNear, zFar);

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  //mat4.perspective(projectionMatrix,
  //                 fieldOfView,
  //                 aspect,
  //                 zNear,
  //                 zFar);

  const startX = Math.floor(camera.x / 2) - 1;
  const startZ = Math.floor(camera.z / 2) - 5;

  // for each row
  for (let z = startZ; z < startZ + buildingsPerColumn * 2; z++) {
    // for each row
    // get the start index in the list
    let startIndex = z * mapSize;

    // now go through each column and draw the tile
    for (let x = startX; x < startX + buildingsPerRow * 2; x ++) {

      let i = startIndex + x;

      // if out of bounds, do not take from another row, just render an out of bounds tile
      if (!(x >= mapSize) && !(x < 0) && !(z < 0) && !(z >= mapSize)) {

        drawTile(gl, map[i], [x, z], programInfo, projectionMatrix, camera.cameraMatrix);

      } else {

        // 254 is code for out of bounds tile
        drawTile(gl, 254, [x, z], programInfo, projectionMatrix, camera.cameraMatrix);

      }

    }

  }

}