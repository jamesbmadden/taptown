import { mat4, vec2 } from 'gl-matrix';
import { screenToGameCoords } from './utils';

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

    // find out how much the camera must be moved to align this tile to the centre
    // to centre the tile it must also be adjusted by half a tile width vertically and horizontally
    // adjust half a tile on y because the tile starts all visible on the Y axis but half on x
    let camOffset: vec2;
    // the way to align the camera depends on the device - so use media queries
    // on mouse-based device, nothing should happen
    if (matchMedia('(pointer: fine)').matches) return;
    // on portrait device, align it within the section of screen visible above the sheet
    else if (matchMedia('(orientation: portrait)').matches) camOffset = screenToGameCoords(
      innerWidth / 2, 
      // find the space remaining above the sheet and divide in half
      (innerHeight - 386 / 256 * innerWidth) / 2 + 100
      );
    // on landscape device, align it to the centre of the area visible to the right of the sheet
    else if (matchMedia('(orientation: landscape)').matches) camOffset = screenToGameCoords(
      // centre it within the space remaining beside the sheet
      (256 / 386 * innerHeight) + (innerWidth - 256 / 386 * innerHeight) / 2, 
      // find the space remaining above the sheet and divide in half
      innerHeight / 2 + 100
      );
    //camOffset = screenToGameCoords(innerWidth / 2, innerHeight / 2 + 100);
    // must be multiplied by two because each tile represents 2 WebGL coordinates
    vec2.multiply(camOffset, camOffset, [2, 2]);

    // set the x and z to this position
    this.x = buildingX * 2 - camOffset[0];
    this.z = buildingZ * 2 - camOffset[1];

    // now set the camera position
    this.cameraMatrix = mat4.create();
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

    mat4.translate(this.cameraMatrix, 
      this.cameraMatrix,
      [-this.x, 0, -this.z]
    );


  }

  /**
   * return to normal view
   */
  exitFocus () {

    // turn off focus mode
    this._inFocusMode = false;

  }

}