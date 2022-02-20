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

export async function createWorkers () {

  // initialize the workers
  const Ambient: any = Comlink.wrap(new _Ambient());
  Ambient.log();
  const Buildings: any = Comlink.wrap(new _Buildings());
  Buildings.log();
  const People: any = Comlink.wrap(new _People());
  People.log();
  // and create instances
  ambient = await new Ambient();
  buildings = await new Buildings();
  people = await new People();

  return { ambient, buildings, people };

}