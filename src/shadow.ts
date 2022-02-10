/**
 * Use depth textures to create shadows - requires depth_texture_extension to be enabled
 */
import { mat4 } from 'gl-matrix';
import drawTile from './drawTile';

// @ts-ignore
import vertexSource from './shaders/shadow.shader.vert?raw';
// @ts-ignore
import fragmentSource from './shaders/shadow.shader.frag?raw';

let enabled = false;
let depthTextureExtension;
let programInfo;

export function init (gl: WebGLRenderingContext) {

  // we're good to go if it's already enabled
  if (enabled) return;

  // otherwise turn the extension on
  depthTextureExtension = gl.getExtension('WEBGL_depth_texture');
  console.log('[WEBGL Depth Texture Extension]', depthTextureExtension);

  // create a new shader program for rendering depth
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vertexSource);
  gl.compileShader(vert);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, fragmentSource);
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

  // most of these are unused, but that should be fine
  programInfo = {
    program: shaderProgram,
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

}

/**
 * Create a frame buffer for rendering shadow depth stuff
 */
export function createFrameBuffer (gl: WebGLRenderingContext, width: number, height: number) {

  // make sure depth textures are enabled
  init(gl);

  // now make one!
  const frameBuffer = gl.createFramebuffer();

  // create a texture for the colours
  const colourTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, colourTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                                  gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


  // create a texture for the depth
  const depthTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, depthTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0,
                                  gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // link it all together 😊
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colourTexture, 0);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

  // and now check for errors
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status != gl.FRAMEBUFFER_COMPLETE) {
    alert("The frame buffer failed: " + status.toString());
  }

  // unbind the new frame buffer so it doesn't get rendered to
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return frameBuffer;

}

export default function render (gl: WebGLRenderingContext, frameBuffer: WebGLFramebuffer, { camera, buildingsPerRow, buildingsPerColumn, map, mapSize }) {

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

  // move light source to past the camera, and look at the x and z 
  const lightSourceMatrix = mat4.create();
  mat4.lookAt(lightSourceMatrix, [camera.x - 10, 2, camera.z - 13.0], [camera.x, 0, camera.z], [0, 1, 0]);

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

        drawTile(gl, map[i], [x, z], programInfo, projectionMatrix, lightSourceMatrix);

      } else {

        // 254 is code for out of bounds tile
        drawTile(gl, 254, [x, z], programInfo, projectionMatrix, lightSourceMatrix);

      }

    }

  }

}