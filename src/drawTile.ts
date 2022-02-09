import loadModel, { Model } from './model';
import { mat4 } from 'gl-matrix';

// import URLs for all the models
// @ts-ignore
import empty from './models/Empty.gltf?url';
// @ts-ignore
import roadX from './models/Road-x.gltf?url';
// @ts-ignore
import roadRight from './models/Road-right.gltf?url';
// @ts-ignore
import roadLeft from './models/Road-left.gltf?url';
// @ts-ignore
import roadZ from './models/Road-y.gltf?url';
// @ts-ignore
import roadUp from './models/Road-up.gltf?url';
// @ts-ignore
import roadDown from './models/Road-down.gltf?url';
// @ts-ignore
import roadCross from './models/Road-cross.gltf?url';
// @ts-ignore
import roadUpLeft from './models/Road-upleft.gltf?url';
// @ts-ignore
import roadLeftDown from './models/Road-leftdown.gltf?url';
// @ts-ignore
import roadDownRight from './models/Road-downright.gltf?url';
// @ts-ignore
import roadRightUp from './models/Road-rightup.gltf?url';
// @ts-ignore
import roadT from './models/Road-T.gltf?url';
// @ts-ignore
import roadTriRight from './models/Road-l-.gltf?url';
// @ts-ignore
import roadTriLeft from './models/Road--l.gltf?url';
// @ts-ignore
import roadTriUp from './models/Road-_l_.gltf?url';
// @ts-ignore
import roadSingle from './models/Road-single.gltf?url';
// @ts-ignore
import outOfBounds from './models/outofbounds.gltf?url';
// @ts-ignore
import debug from './models/Cafe.gltf?url';

/**
 * Model array will be filled with each type of model
 * 0 = empty = null
 */
const models: Model[] = [ null ];
let initiated = false;

/**
 * loads each model type
 * 
 * 0 = empty
 * 1 = road (x direction) ✅ // Road types are processed in the buildings worker
 * 2 = road (right only) ✅
 * 3 = road (left only) ✅
 * 4 = road (z direction) ✅
 * 5 = road (up only) ✅
 * 6 = road (down only) ✅
 * 7 = road (cross) ✅
 * 8 = road (up/left) ✅
 * 9 = road (left/down) ✅
 * 10 = road (down/right) ✅
 * 11 = road (right/up) ✅
 * 12 = road (T) ✅
 * 13 = road (|-) ✅
 * 14 = road (-|) ✅
 * 15 = road (_|_) ✅
 * 16 = road (single) ✅
 * 
 * ...
 * 
 * 254 = out of bounds
 * 255 = debug model (largest number for a Uint8)
 *
 */
export async function init (gl: WebGLRenderingContext) {

  // load blank space
  models[0] = await loadModel(gl, empty);
  // load the roads
  models[1] = await loadModel(gl, roadX);
  models[2] = await loadModel(gl, roadRight);
  models[3] = await loadModel(gl, roadLeft);
  models[4] = await loadModel(gl, roadZ);
  models[5] = await loadModel(gl, roadUp);
  models[6] = await loadModel(gl, roadDown);
  models[7] = await loadModel(gl, roadCross);
  models[8] = await loadModel(gl, roadUpLeft);
  models[9] = await loadModel(gl, roadLeftDown);
  models[10] = await loadModel(gl, roadDownRight);
  models[11] = await loadModel(gl, roadRightUp);
  models[12] = await loadModel(gl, roadT);
  models[13] = await loadModel(gl, roadTriRight);
  models[14] = await loadModel(gl, roadTriLeft);
  models[15] = await loadModel(gl, roadTriUp);
  models[16] = await loadModel(gl, roadSingle);

  // load out of bounds model
  models[254] = await loadModel(gl, outOfBounds);
  // load debug model
  models[255] = await loadModel(gl, debug);


  // tell the drawTile function we're good to go
  initiated = true;

}

/**
 * Takes a gl instance, a model object, coordinates, and a programInfo object to draw one tile. Designed to be looped.
 */
export default function drawTile (gl: WebGLRenderingContext, modelId: number, [x, z]: [number, number], programInfo, projectionMatrix: mat4, masterViewMatrix: mat4) {

  // make sure models have been loaded before starting rendering
  if (!initiated) throw "Models aren't loaded!";
  // now we can get the model
  const model = models[modelId];

  // if the model number doesn't exist/is null, return now (don't draw anything)
  if (!model) return;

  // adjust the master view matrix to align with the x/y coordinates provided
  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,     // destination matrix
    masterViewMatrix,     // matrix to translate
    [x * 2, 0, z * 2]);  // since one tile is 2 WebGL coords, adjust for that - deeper into the screen is negative z

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 3;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
    const offset = 0;         // how many bytes inside the buffer to start from
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  // again with the normals
  {
    const numComponents = 3;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
    const offset = 0;         // how many bytes inside the buffer to start from
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.normalPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.normalPosition);
  }
  // Again with tex coords
  {
    const numComponents = 2;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
    const offset = 0;         // how many bytes inside the buffer to start from
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.buffers.texCoords);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoordPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoordPosition);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.buffers.index);
  
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  // and bind the texture
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, model.texture);
  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.texture, 0);
  
  {
    //gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0);
  }

}