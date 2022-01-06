import loadModel, { Model } from './model';
import { mat4 } from 'gl-matrix';

/**
 * Model array will be filled with each type of model
 * 0 = empty = null
 * 65535 = debug model
 */
const models: Model[] = [ null ];
let initiated = false;

/**
 * loads each model type
 */
export async function init (gl: WebGLRenderingContext) {

  // load debug model
  models[65535] = await loadModel(gl, './src/models/Cafe.gltf');


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
    [x * 2, 0, z * -2]);  // since one tile is 2 WebGL coords, adjust for that - deeper into the screen is negative z

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