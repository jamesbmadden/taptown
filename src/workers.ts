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
const buildingsPeopleChannel = new MessageChannel();
const ambientPeopleChannel = new MessageChannel();

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
  ambient = await new Ambient(Comlink.transfer(ambientPeopleChannel.port1, [ambientPeopleChannel.port1]));
  buildings = await new Buildings(Comlink.transfer(buildingsPeopleChannel.port1, [buildingsPeopleChannel.port1]));
  people = await new People(Comlink.transfer(buildingsPeopleChannel.port2, [buildingsPeopleChannel.port2]), Comlink.transfer(ambientPeopleChannel.port2, [ambientPeopleChannel.port2]));

  return { ambient, buildings, people };

}