import * as Comlink from "comlink";

class Ambient {

  // wrapped port to communicate with people
  people;
  ambient;

  // recieves this from buildings
  map = new Uint8Array();
  // and recieves this from people
  population = 0;

  constructor (fromPeople, toPeople, fromBuildings, toBuildings) {

    // recieve port for people
    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toPeople);
    Comlink.expose(this, toBuildings);
    this.people = Comlink.wrap(fromPeople);
    this.ambient = Comlink.wrap(fromBuildings);

    this.people.test('ambient');
    

  }

  /**
   * Recieve map from buildings and update local copy
   */
  setMap (map: Uint8Array) {
    this.map = map;
  }
  setPopulation (population: number) {
    this.population = population;
  }

  static log () {
    console.log('ambient worker running');
  }

}

Comlink.expose(Ambient);