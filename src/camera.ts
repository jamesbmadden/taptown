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
  // where the mouse used to be
  _prevPointerX: number;
  _prevPointerY: number;

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
    );
    mat4.rotateY(this.cameraMatrix,
      this.cameraMatrix,
      45 * Math.PI / 180
    );

    // now we need some events
    document.addEventListener('pointerdown', event => {
      this._pointerDown = true;
      this._prevPointerX = event.clientX;
      this._prevPointerY = event.clientY;
    });
    // set prev mouse position
    document.addEventListener('pointerup', () => this._pointerDown = false);

    document.addEventListener('pointermove', event => {

      // if the mouse is up we don't need to move camera
      if (this._pointerDown) {
        // calculate difference in pixels
        this._moveCamera(event.clientX - this._prevPointerX, event.clientY - this._prevPointerY);
        // and set velocity to the difference
        this._velocityX = event.clientX - this._prevPointerX;
        this._velocityY = event.clientY - this._prevPointerY;
      }

      // update prev pointer position
      this._prevPointerX = event.clientX;
      this._prevPointerY = event.clientY;

    });

  }

  _moveCamera (xPixels, yPixels) {

    // amount to adjust based on the pixel amounts
    const moveX = xPixels / this._pixelToTileX;
    const moveZ = yPixels / this._pixelToTileZ;

    // because of rotation, trig must be used to calculate movement
    const adjustedMoveX = moveX * Math.cos(45 * Math.PI / 180) - moveZ * Math.sin(45 * Math.PI / 180);
    const adjustedMoveZ = moveZ * Math.cos(45 * Math.PI / 180) + moveX * Math.sin(45 * Math.PI / 180);

    // x and z need to stay related to game position
    this.x -= adjustedMoveX;
    this.z -= adjustedMoveZ;

    mat4.translate(this.cameraMatrix, this.cameraMatrix, [adjustedMoveX, 0, adjustedMoveZ]);

  }

  setPixelToTileRatio (x, z) {
    this._pixelToTileX = x;
    this._pixelToTileZ = z;
  }

  update (delta: number) {

    let framesElapsed = delta / 16.66667;
    // if touch is not down, do velocity stuff
    if (!this._pointerDown) {

      // half velocity, round it to the nearest 10
      this._velocityX = Math.floor(Math.abs(this._velocityX) / 10.25 * framesElapsed) * Math.sign(this._velocityX) * 10 * framesElapsed;
      this._velocityY = Math.floor(Math.abs(this._velocityY) / 10.25 * framesElapsed) * Math.sign(this._velocityY) * 10 * framesElapsed;

      this._moveCamera(this._velocityX, this._velocityY);

    }
  }

}