import './styles.css';
import * as Comlink from 'comlink';
import { mat4 } from 'gl-matrix';

import vShaderSource from './models/shader.vert';
import fShaderSource from './models/shader.frag';

import drawTile, { init as initDrawTiles } from './drawTile';
import Camera from './camera';
import { updateUIFromProperties } from './ui';

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
// x and z position, which will be changed by either swiping or clicking and dragging
let camera = new Camera();

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
  const localX = event.clientX / ratioX;
  const localY = event.clientY / ratioY;
  
  console.log(localX, localY);

});

init();

// initate everything before running the game loop
async function init () {

  // set up workers
  const Ambient: any = Comlink.wrap(new Worker('src/workers/ambient.ts', { type: 'module' }));
  Ambient.log();
  const Buildings: any = Comlink.wrap(new Worker('src/workers/buildings.ts', { type: 'module' }));
  Buildings.log();
  const People: any = Comlink.wrap(new Worker('src/workers/people.ts', { type: 'module' }));
  People.log();

  ambient = await new Ambient();
  buildings = await new Buildings();
  // establish a callback so that any changes to buildings will update the map array
  await buildings.setCallback(Comlink.proxy(newMap => {
    map = newMap;
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

  const TILES_PER_ROW = 20; // this is a temp number it will probably expand later

  const startX = Math.floor(camera.x / 2) - 1;
  const startZ = Math.floor(camera.z / 2) - 5;

  // for each row
  for (let z = startZ; z < startZ + buildingsPerColumn * 2; z++) {
    // for each row
    // get the start index in the list
    let startIndex = z * 20;

    // now go through each column and draw the tile
    for (let x = startX; x < startX + buildingsPerRow * 2; x ++) {

      let i = startIndex + x;

      // if out of bounds, do not take from another row, just render an out of bounds tile
      if (!(x >= TILES_PER_ROW) && !(x < 0) && !(z < 0) && !(z >= TILES_PER_ROW)) {

        drawTile(gl, map[i], [x, z], programInfo, projectionMatrix, camera.cameraMatrix);

      } else {

        // 254 is code for out of bounds tile
        drawTile(gl, 254, [x, z], programInfo, projectionMatrix, camera.cameraMatrix);

      }

    }

  }

  // run a loop to draw each tile
  /*for (let i = 0; i < tilesToDraw; i++) {

    // get the coordinates
    let x = i % 20; // THIS WILL CHANGE WHEN RENDERING BECOMES ONLY THE SUBSECTION OF MAP VISIBLE
    let z = Math.floor(i / 20); // SAME AS ABOVE

    // drawTile will adjust positioning based on the x/y provided :)
    drawTile(gl, map[i], [x, z], programInfo, projectionMatrix, camera.cameraMatrix);

  }*/

}