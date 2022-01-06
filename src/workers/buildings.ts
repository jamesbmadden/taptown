import * as Comlink from "comlink";

class Buildings {

  map = new Uint8Array([
    255, 0, 0, 255, 255, 0, 0, 255,
    0, 255, 0, 255, 255, 255, 255, 0,
  ]);

  _cb: Function;

  static log () {
    console.log('buildings worker running');
  }

  setCallback (cb) {
    this._cb = cb;
    this._cb(this.map);
  }

}

Comlink.expose(Buildings);