import * as Comlink from "comlink";

interface Person {
  name: [String, String],
  property: number,
  isEmployed: boolean,
  age: number,
  id: number
}

class People {

  // group people by property, it can be flattened for whole population
  

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