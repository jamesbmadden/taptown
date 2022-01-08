import * as Comlink from "comlink";

class Player {

  money: number;

  static log () {
    console.log('player worker running');
  }

}

Comlink.expose(Player);