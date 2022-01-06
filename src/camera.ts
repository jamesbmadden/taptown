import { mat4 } from 'gl-matrix';

/**
 * Camera manages camera position and tracks pointer events
 */

export default class Camera {

  // x and z position for the camera
  x: number = 0;
  z: number = 0;

  // important variables to keep track of how movement should behave
  _pointerDown = false;
  _velocityX: number = 0;
  _velocityY: number = 0;
  // adjust between WebGL coordinates and device pixels
  _pixelToTileX: number;
  _pixelToTileZ: number;

  cameraMatrix: mat4 = mat4.create();

  constructor () {

    // align camera to starting position
    mat4.translate(this.cameraMatrix,
      this.cameraMatrix,
      [0.0, 1.0, -3.0]);

    // turn camera to isometric angle
    mat4.rotateX(this.cameraMatrix,
      this.cameraMatrix,
      45 * Math.PI / 180
    )
    mat4.rotateY(this.cameraMatrix,
      this.cameraMatrix,
      45 * Math.PI / 180
    )

  }

  setPixelToTileRatio (x, z) {
    this._pixelToTileX = x;
    this._pixelToTileZ = z;
  }

}