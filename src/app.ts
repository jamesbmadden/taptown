/**
 * Code for the APP page (/app/), where the game actually runs.
 */

import './app.css';
import * as Comlink from 'comlink';
import { mat4, vec2 } from 'gl-matrix';

// @ts-ignore
import vShaderSource from './shaders/shader.vert?raw';
// @ts-ignore
import fShaderSource from './shaders/shader.frag?raw';

import drawTile, { init as initDrawTiles } from './drawTile';
import Camera from './camera';
import { updateUIFromProperties, openTileMenu } from './ui';
import shadowRender, { createFrameBuffer } from './shadow';

import { createWorkers, ambient, buildings, people } from './workers';

import { screenToGameCoords } from './utils';

// global variables
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
// the coordinate mouse is hovering over (default to smth way out of the way)
let mouseCoords = [-100, -100];
// keep track of the save file name
let saveId: String;

// allow other files to easily access certain variables
export { ambient, buildings, people, camera, mapSize };

// provide the camera object on window for easier debugging
// @ts-expect-error
window.camera = camera;

canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;
// make sure camera knows how to adjust between device pixels and WebGL tiles
let ratioX = innerWidth / buildingsPerRow;
let ratioY = innerHeight / buildingsPerColumn; // calculate buildings per column

camera.setPixelToTileRatio(ratioX, ratioY);

let gl = canvas.getContext('webgl');

// make sure the canvas always matches the window resolution
window.addEventListener('resize', () => {
  // scale the canvas
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  // now make a gl respect this new scale
  gl.viewport(0, 0, canvas.width, canvas.height);
  // and adjust constants
  buildingsPerRow = 2 * (innerWidth / 200);
  buildingsPerColumn = 2 * (innerHeight / 200);
  // make sure camera knows how to adjust between device pixels and WebGL tiles
  let ratioX = innerWidth / buildingsPerRow;
  let ratioY = innerHeight / buildingsPerColumn; // calculate buildings per column
  camera.setPixelToTileRatio(ratioX, ratioY);
});

// on mouse move get tile currently highlighted
canvas.addEventListener('mousemove', (event: MouseEvent) => {

  // get the local game coords from the utils function
  const gameCoords: vec2 = screenToGameCoords(event.clientX, event.clientY);

  // now it must be adjusted according to the camera's position
  // camera position must be adjusted slightly to match what the screen actually looks like
  // adjustment for Y should *hopefully* be automatic from the new localY code
  // (camera positions, because its for the internal renderer and not game coordinates, need to be halved)
  const cameraCoords: vec2 = [camera.x / 2, camera.z / 2 + 1];
  vec2.add(gameCoords, gameCoords, cameraCoords);
  // floor the result 
  vec2.floor(gameCoords, gameCoords);
  // and that's the coordinates! Yay!
  mouseCoords = gameCoords;

  // console.log(mouseCoords);

});

// when the canvas is clicked, find the in-game coords of the location
canvas.addEventListener('click', (event: MouseEvent) => {

  // add the component
  openTileMenu(mouseCoords[0], mouseCoords[1], event);

  //camera.enterFocus(gameCoords);
});

document.querySelector('.writeSaveButton').addEventListener('click', async () => {

  // write to save
  await buildings.writeSave(saveId);

});

init();

// initate everything before running the game loop
async function init () {

  // set up workers
  await createWorkers();
  
  // establish a callback so that any changes to buildings will update the map array
  await buildings.setCallback(Comlink.proxy(newMap => {
    map = newMap;
    mapSize = Math.sqrt(map.length); // maps are square, so this should work?
  }));
  
  // establish a callback so that updates to values will appear in UI
  await people.setCallback(Comlink.proxy(properties => {
    updateUIFromProperties(properties);
  }));

  // Before setting up workers, data must be loaded. Check to see if save ID was provided
  const searchParams = new URLSearchParams(location.search);
  saveId = searchParams.get('save');

  // if no save ID provided, alert and redirect to landing page
  if (!saveId) {
    alert('Save not provided.');
    location.replace('../');
  }

  // read the database and grab the save
  const save = await buildings.loadSave(saveId);

  // if save is null then error
  if (!save) {
    alert('Save couldn\'t be loaded.');
    location.replace('../');
  }
  // otherwise we have the save! Use it to load
  // set the document title to the save name
  document.title = `🏠 ${saveId} • TapTown!`;
  console.log(save);

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

  // create a frame buffer for the shadows
  const frameBuffer = createFrameBuffer(gl, innerWidth, innerHeight);

  // get locations for attributes and uniforms
  const programInfo = {
    program: shaderProgram,
    frameBuffer,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoordPosition: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      normalPosition: gl.getAttribLocation(shaderProgram, 'aNormal')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      texture: gl.getUniformLocation(shaderProgram, "uTexture"),
      highlight: gl.getUniformLocation(shaderProgram, "uHighlight")
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
    shadowRender(gl, frameBuffer, { camera, buildingsPerRow, buildingsPerColumn, map, mapSize });
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

      // if this tile is highlighted
      if (x === mouseCoords[0] && z === mouseCoords[1]) {
        gl.uniform1i(programInfo.uniformLocations.highlight, 1);
      } else {
        gl.uniform1i(programInfo.uniformLocations.highlight, 0);
      }

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