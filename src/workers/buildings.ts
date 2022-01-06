import * as Comlink from "comlink";

class Buildings {

  map = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
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