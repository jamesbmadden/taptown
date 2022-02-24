import * as Comlink from "comlink";

class Ambient {

  // wrapped port to communicate with people
  people;

  constructor (fromPeople, toPeople) {

    // recieve port for people
    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toPeople);
    this.people = Comlink.wrap(fromPeople);

    this.people.test('ambient');
    

  }

  static log () {
    console.log('ambient worker running');
  }

}

Comlink.expose(Ambient);