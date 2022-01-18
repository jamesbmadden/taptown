/**
 * code for the LANDING page (/). Load, create, manage saves before sending user into game
 */
import { openDB, deleteDB } from 'idb';
import loadDb, { getSavesList } from './db';

// here's the database structure
interface GameSave {

  lastSaved: number,

  map: Uint8Array

}

// get references to elements
const savesListElement = document.querySelector('.game-saves');
const addButton = document.querySelector('.add-save');
// @ts-expect-error
const newSaveInput: HTMLInputElement = document.getElementById('new-save-name');

main();

// open database. If it doesn't exist, establish one.
async function main () {

  // open a database. If one doesn't exist, create it.
  const db = await loadDb();

  // get list of saves to add to saves list
  updateSavesList(await getSavesList(db));

  // when add button is clicked, add new save to indexedDB
  addButton.addEventListener('click', async () => {

    // get the new save name
    const key = newSaveInput.value;

    // pretend this is valid game data
    const emptySave: GameSave = {

      lastSaved: Date.now(),
      map: new Uint8Array([255]) // default game is 1x1 and just the debug tile

    }

    // create a transaction and add this new save
    const saves = db.transaction('saves', 'readwrite').objectStore('saves');

    await saves.put(emptySave, key);

    console.log(key, 'save added');

    updateSavesList(await getSavesList(db));


  });


}

/**
 * show the saves in the UI
 */
function updateSavesList (savesList: Array<any>) {

  // first clear out the saves
  savesListElement.innerHTML = ``;

  savesList.forEach(save => {

    const span = document.createElement('span');
    span.textContent = save;

    const li = document.createElement('li');
    li.innerHTML = `${span.outerHTML} - <a href="./app/?save=${encodeURIComponent(save)}">Play</a>`;

    // add to the savesListElement
    savesListElement.appendChild(li);

  });

}