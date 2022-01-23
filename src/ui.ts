/**
 * UI handles DOM interaction
 */
// import all the UI components
import TileMenu from './components/tile';

const money = document.querySelector('.money');
const population = document.querySelector('.population');

/**
 * get properties from player worker and update it
 */
export function updateUIFromProperties (properties) {

  // update the money counter
  money.textContent = `$${properties.money}`;
  population.textContent = `${properties.population}`;

}

/**
 * open the tile menu
 */
export function openTileMenu (x: number, z: number) {

  // create element
  // @ts-ignore
  const tileComponent: TileMenu = document.createElement('tt-tile');
  // set the properties
  tileComponent.x = x;
  tileComponent.z = z;
  // add it to the document
  document.body.appendChild(tileComponent);

}