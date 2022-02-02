import { mat4, vec2 } from 'gl-matrix';

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

  // state: whether or not camera is focusing on an object
  _inFocusMode = false;

  cameraMatrix: mat4 = mat4.create();

  constructor () {

    // align camera to starting position
    mat4.translate(this.cameraMatrix,
      this.cameraMatrix,
      [0.0, 0.0, -3.0]);

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

    // if focus mode is on, the camera should not be movable
    if (this._inFocusMode) return;

    // amount to adjust based on the pixel amounts
    const moveX = xPixels / this._pixelToTileX;
    const moveZ = yPixels / this._pixelToTileZ * 1.425;

    // because of rotation, trig must be used to calculate movement
    //const adjustedMoveX = moveX * Math.cos(45 * Math.PI / 180) - moveZ * Math.sin(45 * Math.PI / 180);
    //const adjustedMoveZ = moveZ * Math.cos(45 * Math.PI / 180) + moveX * Math.sin(45 * Math.PI / 180);

    // try using a vec2 instead of manual trig to simplify things
    const adjustedMove: vec2 = [moveX, moveZ];

    vec2.rotate(adjustedMove, adjustedMove, [0, 0], 45 * Math.PI / 180);

    // x and z need to stay related to game position
    this.x -= adjustedMove[0];
    this.z -= adjustedMove[1];

    mat4.translate(this.cameraMatrix, this.cameraMatrix, [adjustedMove[0], 0, adjustedMove[1]]);

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

  /**
   * given a TILE coordinate, zoom in and focus on that building
   */
  enterFocus ([buildingX, buildingZ]: vec2) {

    // set focus mode to true
    this._inFocusMode = true;

    // now transition from starting position to end position
    const startTime = Date.now();

    const enteringFocusFrame = () => {

      // percentage of the transition complete
      let progress = (Date.now() - startTime) / 1000;
      if (progress > 1) progress = 1;
      // now weighted average the two angles to see what angle to use
      // formula: INITIAL * 1 - progress + FINAL * progress;
      const translateX = -this.x * (1 - progress) + ((-buildingX * 2) + (innerWidth / 200)) * progress;
      const translateZ = -this.z * (1 - progress) + ((-buildingZ * 2) + (innerHeight / 200)) * progress;
      const scaleFactor = 1// + progress;

      // now create the matrix
      // create camera matrix for the building
      this.cameraMatrix = mat4.create();
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
      // scale the world
      mat4.scale(this.cameraMatrix, this.cameraMatrix, [scaleFactor, scaleFactor, scaleFactor]);
      // and move it into position
      mat4.translate(this.cameraMatrix, this.cameraMatrix, [translateX, 0, translateZ]);

      // repeat if progress isn't done
      if (progress < 1) requestAnimationFrame(enteringFocusFrame);

    }

    requestAnimationFrame(enteringFocusFrame);

  }

  /**
   * return to normal view
   */
  exitFocus () {

    // construct new cameraMatrix based on position
    this.cameraMatrix = mat4.create();
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
    // and move it into position
    mat4.translate(this.cameraMatrix, this.cameraMatrix, [-this.x, 0, -this.z]);

    // turn off focus mode
    this._inFocusMode = false;

  }

}