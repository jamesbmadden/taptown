import * as Comlink from "comlink";

class Buildings {

  map = new Int8Array([0]);

  static log () {
    console.log('buildings worker running');
  }

}

Comlink.expose(Buildings);