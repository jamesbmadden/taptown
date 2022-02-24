import * as Comlink from "comlink";

interface Person {
  name: [String, String],
  property: number,
  isEmployed: boolean,
  age: number,
  id: number
}

class People {

  // reference wrapped by comlink
  buildings;
  ambient;

  // group people by property, it can be flattened for whole population
  people: Person[][] = [];

  properties = {
    money: 100,
    population: 0
  }

  _cb: Function;

  constructor (fromBuildings, toBuildings) {

    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toBuildings);
    this.buildings = Comlink.wrap(fromBuildings);

  }

  test () {
    console.log('cross-worker comlink working');
  }

  static log () {
    console.log('people worker running');
  }

  setCallback (cb) {

    this._cb = cb;
    this._cb(this.properties);

  }

}

Comlink.expose(People);