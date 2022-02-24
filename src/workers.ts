// load workers
// @ts-expect-error
import _Ambient from './workers/ambient?worker';
// @ts-expect-error
import _Buildings from './workers/buildings?worker';
// @ts-expect-error
import _People from './workers/people?worker';

import * as Comlink from 'comlink';

let ambient;
let buildings;
let people;

export { ambient, buildings, people };

// create MessagePorts to communicate between workers
// because these channels will be wrapped by comlink, one is required per worker that it can establish itself on,
// while each other worker requires a channel to wrap.
// PORT 1 is for THE WORKER ITSELF, PORT 2 is for communicating with it.
// unfortunately, a Message channel is needed for each direction of each worker
// const toAmbientChannel = new MessageChannel();
const peopleToBuildingsChannel = new MessageChannel();
const buildingsToPeopleChannel = new MessageChannel();

export async function createWorkers () {

  // initialize the workers
  const Ambient: any = Comlink.wrap(new _Ambient());
  Ambient.log();
  const Buildings: any = Comlink.wrap(new _Buildings());
  Buildings.log();
  const People: any = Comlink.wrap(new _People());
  People.log();
  // and create instances
  // instances require being passed the ports to allow them to comunicate with each other
  ambient = await new Ambient();
  buildings = await new Buildings(
    Comlink.transfer(peopleToBuildingsChannel.port1, [peopleToBuildingsChannel.port1]),
    Comlink.transfer(buildingsToPeopleChannel.port2, [buildingsToPeopleChannel.port2]),
  );
  people = await new People(
    Comlink.transfer(buildingsToPeopleChannel.port1, [buildingsToPeopleChannel.port1]),
    Comlink.transfer(peopleToBuildingsChannel.port2, [peopleToBuildingsChannel.port2])
  );

  return { ambient, buildings, people };

}