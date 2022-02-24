import * as Comlink from "comlink";

interface Person {
  name: [String, String],
  property: number,
  isEmployed: boolean,
  age: number,
  id: number
}

class People {

  // ports for communicating with other workers
  buildingsPort: MessagePort;
  ambientPort: MessagePort;

  // group people by property, it can be flattened for whole population
  people: Person[][] = [];

  properties = {
    money: 100,
    population: 0
  }

  _cb: Function;

  constructor (buildingsPort, ambientPort) {

    // recieve the ports
    this.buildingsPort = buildingsPort;
    this.ambientPort = ambientPort;

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