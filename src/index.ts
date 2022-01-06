import './styles.css';
import * as Comlink from 'comlink';
import { mat4 } from 'gl-matrix';

import vShaderSource from './models/shader.vert';
import fShaderSource from './models/shader.frag';

import loadTexture from './textures';
import loadModel, { Model } from './model';

// global variables
let ambient;
let buildings;
let people;
const canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];

canvas.width = innerWidth;
canvas.height = innerHeight;

const gl = canvas.getContext('webgl');

// make sure the canvas always matches the window resolution
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
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
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  
  const modelInfo = await loadModel(gl, './src/models/snowman.gltf');

  // setup loop and requestAnimationFrame
  const loop = (now) => {

    render(programInfo, modelInfo);
    requestAnimationFrame(loop);
    
  }

  requestAnimationFrame(loop);

}

// render
function render (programInfo, modelInfo: Model) {

  gl.clearColor(0.39, 0.65, 0.4, 1);
  gl.clearDepth(1.0);  // Clear everything
  gl.enable(gl.DEPTH_TEST);  // Enable depth testing
  gl.depthFunc(gl.LEQUAL);  // Near things obscure far things
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // create perspective matrix
  const fieldOfView = 90 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [-0.0, 0.0, -3.0]);  // amount to translate
  mat4.rotateX(modelViewMatrix,
    modelViewMatrix,
    0 * Math.PI / 180
  )

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 3;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
    const offset = 0;         // how many bytes inside the buffer to start from
    
    gl.bindBuffer(gl.ARRAY_BUFFER, modelInfo.buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelInfo.buffers.index);
  
  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);
  
  {
    //gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    gl.drawElements(gl.TRIANGLES, modelInfo.indexCount, gl.UNSIGNED_SHORT, 0);
  }

}