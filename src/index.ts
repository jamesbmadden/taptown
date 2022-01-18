/**
 * code for the LANDING page (/). Load, create, manage saves before sending user into game
 */
import { openDB, deleteDB } from 'idb';

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
  const db = await openDB('taptown', 1, {

    // the database needs to be created or upgraded.
    upgrade (db, oldVersion, newVersion, transaction) {

      // if oldVersion = 0, database is empty and should be established
      if (oldVersion === 0) { 
        // so lets create the saves object store
        db.createObjectStore('saves');

      }

    }

  });

  // get list of saves to add to saves list
  const saves = db.transaction('saves', 'readonly').objectStore('saves');
  updateSavesList(await saves.getAllKeys());

  // when add button is clicked, add new save to indexedDB
  addButton.addEventListener('click', async () => {

    // get the new save name
    const key = newSaveInput.value;

    // pretend this is valid game data
    const emptySave: GameSave = {

      lastSaved: Date.now(),
      map: new Uint8Array()

    }

    // create a transaction and add this new save
    const saves = db.transaction('saves', 'readwrite').objectStore('saves');

    await saves.put(emptySave, key);

    console.log(key, 'save added');

    updateSavesList(await saves.getAllKeys());


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