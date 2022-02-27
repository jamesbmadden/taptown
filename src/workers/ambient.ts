import * as Comlink from "comlink";

class Ambient {

  // wrapped port to communicate with people
  people;
  ambient;

  constructor (fromPeople, toPeople, fromBuildings, toBuildings) {

    // recieve port for people
    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toPeople);
    Comlink.expose(this, toBuildings);
    this.people = Comlink.wrap(fromPeople);
    this.ambient = Comlink.wrap(fromBuildings);

    this.people.test('ambient');
    

  }

  static log () {
    console.log('ambient worker running');
  }

}

Comlink.expose(Ambient);