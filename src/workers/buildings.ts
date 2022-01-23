import * as Comlink from "comlink";
import loadDb, { getSave, GameSave } from '../db';

class Buildings {

  mapSize: number;


  _roads = [];

  map = new Uint8Array();

  /**
   * Build the correct map size
   */
  constructor () {

    // this.drawRoads();

  }

  /**
   * Load the map from IndexedDB storage
   */
  async loadSave (saveName) {

    // load save from indexedDB
    const db = await loadDb();
    const save = await getSave(db, saveName);
    
    // set the map to save.map
    this.map = save.map;
    // get the proper size of the world
    this.mapSize = Math.sqrt(save.map.length);

    // map updated! Trigger callback
    this._cb(this.map);
    // return it to main thread
    return save;

  }

  /**
   * Change a tile type and trigger an update on the main thread
   */
  setTile (x, z, type) {

    // get the coordinate in the map
    const mapId = z * this.mapSize + x;
    this.map[mapId] = type;

    // now trigger an update on the main thread
    this._cb(this.map);

  }

  /**
   * Take road map and convert it to correct tile types
   */
  _drawRoads () {

    // loop over every row in this._roads
    for (let y = 0; y < this.mapSize; y++) {

      // loop over every tile in the row
      for (let x = 0; x < this.mapSize; x++) {

        const tile = this._roads[y][x];
        // if true, tile is road
        if (tile) {
          // create variable for output type
          let roadNum = 0;
          // check to see which sides have roads
          let roadUp = !!this._roads[y - 1]?.[x];
          let roadDown = !!this._roads[y + 1]?.[x];
          let roadLeft = !!this._roads[y][x - 1];
          let roadRight = !!this._roads[y][x + 1];
          // now lets run through the options
          if (roadUp && roadDown && roadLeft && roadRight) {
            // cross type!
            roadNum = 7;
          } else if (roadUp && roadDown && roadLeft) {
            // -| Type!
            roadNum = 14;
          } else if (roadUp && roadDown && roadRight) {
            // |- Type!
            roadNum = 13;
          } else if (roadDown && roadRight && roadLeft) {
            // T type!
            roadNum = 12;
          } else if (roadUp && roadLeft && roadRight) {
            // _|_ type!
            roadNum = 15;
          } else if (roadLeft && roadRight) {
            // x type!
            roadNum = 1;
          } else if (roadUp && roadDown) {
            // z type!
            roadNum = 4;
          } else if (roadLeft && roadUp) {
            // upleft type!
            roadNum = 8;
          } else if (roadLeft && roadDown) {
            // leftdown type!
            roadNum = 9;
          } else if (roadDown && roadRight) {
            // downright type!
            roadNum = 10;
          } else if (roadRight && roadUp) {
            // rightup type!
            roadNum = 11;
          // finally the single types!!
          } else if (roadUp) roadNum = 5;
          else if (roadDown) roadNum = 6;
          else if (roadRight) roadNum = 2;
          else if (roadLeft) roadNum = 3;
          // if none of those are true it's a single
          else roadNum = 16;

          // now we can give that to the map
          // find the space in the map to use
          let mapId = y * this.mapSize + x;
          this.map[mapId] = roadNum;
        }

      }

    }

  }


  _cb: Function;

  static log () {
    console.log('buildings worker running');
  }

  setCallback (cb) {
    this._cb = cb;
    this._cb(this.map);
  }

}

Comlink.expose(Buildings);