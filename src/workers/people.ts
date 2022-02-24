import * as Comlink from "comlink";

// an ease-of-use function for generating a random integer
const randomInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1));

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

  constructor (fromBuildings, toBuildings, fromAmbient, toAmbient) {

    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toBuildings);
    Comlink.expose(this, toAmbient);
    this.buildings = Comlink.wrap(fromBuildings);
    this.ambient = Comlink.wrap(fromAmbient);

  }

  test (worker: String) {
    console.log('recieved cross-worker from ' + worker);
  }

  /**
   * Move in a household to a newly built tile
   * @param tile The location of the tile to use
   * @param type Type of tile being built
   */
  moveIn (tile: number, type: number) {

    // pick how many people to move in
    const householdSize = randomInt(1, 5);
    console.log(householdSize);

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