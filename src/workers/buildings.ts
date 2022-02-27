import * as Comlink from "comlink";
import loadDb, { getSave, writeSave, GameSave } from '../db';

class Buildings {

  // wrapped port to communicate with people
  people;
  ambient;

  mapSize: number;


  _roads = [];

  map = new Uint8Array();

  /**
   * Build the correct map size
   */
  constructor (fromPeople, toPeople, fromAmbient, toAmbient) {

    // recieve the port for people and use comlink to allow communication
    Comlink.expose(this, toPeople);
    Comlink.expose(this, toAmbient);
    this.people = Comlink.wrap(fromPeople);
    this.ambient = Comlink.wrap(fromAmbient);

    this.people.test('buildings');
    
    // this.drawRoads();

  }

  /**
   * Load the map from IndexedDB storage
   */
  async loadSave (saveName) {

    // load save from indexedDB
    const db = await loadDb();
    const save: GameSave = await getSave(db, saveName);
    
    // set the map to save.map
    this.map = save.map;
    // get the proper size of the world
    this.mapSize = Math.sqrt(save.map.length);
    // build a road map
    this._buildRoadMap();

    // give the people worker the data to update
    await this.people.loadSave(save);

    // map updated! Trigger callback
    this._cb(this.map);
    // return it to main thread
    return save;

  }

  /**
   * Write the map and other gamme data to the IndexedDB storage
   */
  async writeSave (saveName) {

    // first, gather all the necessary data from the disparate sources
    const save: GameSave = {
      lastSaved: Date.now(),
      timePlayed: 0,
      map: this.map,
      people: await this.people.people,
      nextPersonId: await this.people.nextPersonId,
      money: await this.people.properties.money
    }; 

    // now write this data to the storage
    const db = await loadDb();
    await writeSave(db, saveName, save);

  }

  /**
   * Change a tile type and trigger an update on the main thread
   */
  async setTile (x, z, type) {

    // get the coordinate in the map
    const mapId = z * this.mapSize + x;
    this._roads[mapId] = false;
    // run _drawRoads
    this._drawRoads();
    this.map[mapId] = type;

    // if the type is 255 (debug, currently used as housing), tell people to move some people in!
    if (type === 255) {

      await this.people.moveIn(mapId, type);

    }

    // now trigger an update on the main thread
    this._cb(this.map);

  }

  /**
   * build a road at the specified coordinate, run _drawRoads, and then send the result back to main thread
   */
  buildRoad (x, z) {

    // get the coordinate in the map
    const mapId = z * this.mapSize + x;
    this._roads[mapId] = true;
    // run _drawRoads
    this._drawRoads();
    // now callback with the map
    this._cb(this.map);


  }

  /**
   * Take game world data and build a road map
   */
  _buildRoadMap () {

    // new empty road map
    this._roads = new Array(this.map.length);

    // run through every tile in the map
    for (let i = 0; i < this.map.length; i++) {

      // check if the tile is a road and if so, set the right index on the _roads list to true
      if (this.map[i] >= 1 && this.map[i] <= 16) this._roads[i] = true;

    }

  }

  /**
   * Take road map and convert it to correct tile types
   */
  _drawRoads () {

    // loop over every tile in this._roads
    for (let i = 0; i < this._roads.length; i++) {

      const tile = this._roads[i];
      // if true, tile is road
      if (tile) {
        // create variable for output type
        let roadNum = 0;
        // check to see which sides have roads
        let roadUp = !!this._roads[i - this.mapSize];
        let roadDown = !!this._roads[i + this.mapSize];
        let roadLeft = !!this._roads[i - 1];
        let roadRight = !!this._roads[i + 1];
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
        this.map[i] = roadNum;
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