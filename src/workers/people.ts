import * as Comlink from "comlink";
// import list of names for use in generating people
// this is a big file, potentially consider lazy loading in the future?
import { firstNames, lastNames } from '../lists/names';
import { GameSave } from '../db';
import { randomInt } from '../utils';

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

  // this needs to be loaded from a save once that's implemented
  // lets the game keep track of what unique ID to use for the next person to move in
  nextPersonId = 0;

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
   * Load people data from the save
   */
  loadSave (saveData: GameSave) {

    this.people = saveData.people;
    this.properties.population = this.people.flat().length;
    this.nextPersonId = saveData.nextPersonId;
    this._cb(this.properties);

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
    // create an array of length householdSize of people to move in here
    const household = [];
    // the whole household shares a last name, so pick it here:
    const lastName = lastNames[randomInt(0, 1999)];
    for (let i = 0; i < householdSize; i++) {

      // eventually these characteristics will be randomized but for now it is prefilled
      const debugPerson = {
        name: [firstNames[randomInt(0, 999)], lastName],
        property: tile,
        isEmployed: false,
        age: 0,
        id: this.nextPersonId++
      }
      household.push(debugPerson);

    }
    console.log(household);
    // now add the people at their property ID in the population array
    this.people[tile] = household;
    // update the world properties to match the new population
    this.properties.population = this.people.flat().length;
    this._cb(this.properties);

  }

  /**
   * Get the list of residents at the specified x and y coordinates
   * @param x 
   * @param z 
   */
  getResidents (x, z) {

    // get the index in the array
    const mapId = z * 64 + x;
    // return the people at that index
    return this.people[mapId];

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