import * as Comlink from "comlink";

class Ambient {

  static log () {
    console.log('ambient worker running');
  }

}

Comlink.expose(Ambient);