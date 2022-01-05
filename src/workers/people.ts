import * as Comlink from "comlink";

class People {

  static log () {
    console.log('people worker running');
  }

}

Comlink.expose(People);