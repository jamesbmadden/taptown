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
const peopleToBuildingsChannel = new MessageChannel();
const buildingsToPeopleChannel = new MessageChannel();

const peopleToAmbientChannel = new MessageChannel();
const ambientToPeopleChannel = new MessageChannel();

const buildingsToAmbientChannel = new MessageChannel();
const ambientToBuildingsChannel = new MessageChannel();

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
  ambient = await new Ambient(
    Comlink.transfer(peopleToAmbientChannel.port1, [peopleToAmbientChannel.port1]),
    Comlink.transfer(ambientToPeopleChannel.port2, [ambientToPeopleChannel.port2]),

    Comlink.transfer(buildingsToAmbientChannel.port1, [buildingsToAmbientChannel.port1]),
    Comlink.transfer(ambientToBuildingsChannel.port2, [ambientToBuildingsChannel.port2])
  );
  buildings = await new Buildings(
    Comlink.transfer(peopleToBuildingsChannel.port1, [peopleToBuildingsChannel.port1]),
    Comlink.transfer(buildingsToPeopleChannel.port2, [buildingsToPeopleChannel.port2]),

    Comlink.transfer(ambientToBuildingsChannel.port1, [ambientToBuildingsChannel.port1]),
    Comlink.transfer(buildingsToAmbientChannel.port2, [buildingsToAmbientChannel.port2])
  );
  people = await new People(
    Comlink.transfer(buildingsToPeopleChannel.port1, [buildingsToPeopleChannel.port1]),
    Comlink.transfer(peopleToBuildingsChannel.port2, [peopleToBuildingsChannel.port2]),

    Comlink.transfer(ambientToPeopleChannel.port1, [ambientToPeopleChannel.port1]),
    Comlink.transfer(peopleToAmbientChannel.port2, [peopleToAmbientChannel.port2])
  );

  return { ambient, buildings, people };

}