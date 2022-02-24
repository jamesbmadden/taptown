import * as Comlink from "comlink";

class Ambient {

  // ports for communicating with other workers
  peoplePort: MessagePort;

  constructor (peoplePort) {

    // recieve port for people
    this.peoplePort = peoplePort;

  }

  static log () {
    console.log('ambient worker running');
  }

}

Comlink.expose(Ambient);