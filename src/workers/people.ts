import * as Comlink from "comlink";

class People {

  properties = {
    money: 100,
    population: 10
  }

  _cb: Function;

  static log () {
    console.log('people worker running');
  }

  setCallback (cb) {

    this._cb = cb;
    this._cb(this.properties);

  }

}

Comlink.expose(People);