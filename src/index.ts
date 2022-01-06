import './styles.css';
import * as Comlink from 'comlink';
import { mat4 } from 'gl-matrix';

import vShaderSource from './models/shader.vert';
import fShaderSource from './models/shader.frag';

import loadModel, { Model } from './model';
import drawTile from './drawTile';

// global variables
let ambient;
let buildings;
let people;
const canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
// how many buildings should fit on-screen horizontally (an iPhone should roughly show 2 for reference)
// each building is 2 x/z for reference
let buildingsPerRow = 2 * (innerWidth / 200);
// map of the world - which buildings go where, etc
let map: Int16Array;

canvas.width = innerWidth;
canvas.height = innerHeight;

const gl = canvas.getContext('webgl');

// make sure the canvas always matches the window resolution
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  buildingsPerRow = 2 * (innerWidth / 200);
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
  
  const modelInfo = await loadModel(gl, './src/models/Cafe.gltf');

  // setup loop and requestAnimationFrame
  const loop = (now) => {

    render(programInfo, modelInfo);
    requestAnimationFrame(loop);
    
  }

  requestAnimationFrame(loop);

}

// render
function render (programInfo, modelInfo: Model) {

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

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [0.0, 1.0, -3.0]);  // amount to translate // NOTE: Due to perspective Z is totally irellevant lol
  mat4.rotateX(modelViewMatrix,
    modelViewMatrix,
    45 * Math.PI / 180
  )
  //mat4.rotateY(modelViewMatrix,
  //  modelViewMatrix,
  //  45 * Math.PI / 180
  //)

  // run a loop to draw each tile
  for (let tile of map) {

    // calculate the coordinates
    

  }

  drawTile(gl, modelInfo, [0, 0], programInfo, projectionMatrix, modelViewMatrix);

}