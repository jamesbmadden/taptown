/**
 * code for the LANDING page (/). Load, create, manage saves before sending user into game
 */
import '@pwabuilder/pwainstall';

import loadDb, { getSavesList, GameSave } from './db';

// get references to elements
const saveListElement = document.querySelector('.save-list');
const addButton = document.querySelector('.add-save');
// @ts-ignore
const newSaveName: HTMLInputElement = document.getElementById('new-save-name');

// determine whether we are running in PWA mode?
const isPwa = (new URLSearchParams(location.search)).get('pwa');
// if it's in PWA mode, disable the install button
// @ts-ignore
if (isPwa === 'true') document.querySelector('.card-install').hidden = true;

let db;

main();

// open database. If it doesn't exist, establish one.
async function main () {

  // open a database. If one doesn't exist, create it.
  db = await loadDb();

  // when add button is clicked, add new save to indexedDB
  addButton.addEventListener('click', async () => {

    // get the new save name
    const key = newSaveName.value;

    // pretend this is valid game data
    const emptySave: GameSave = {

      lastSaved: Date.now(),
      timePlayed: 0,
      map: new Uint8Array(Array(4096).fill(0)), // default game is 64x64 and empty
      people: [],
      nextPersonId: 0,
      money: 100

    }

    // create a transaction and add this new save
    const saves = db.transaction('saves', 'readwrite').objectStore('saves');

    await saves.put(emptySave, key);

    console.log(key, 'save added');

    updateSavesList(await getSavesList(db));


  });

  // get list of saves to add to saves list
  updateSavesList(await getSavesList(db));


}

/**
 * show the saves in the UI
 */
function updateSavesList (savesList: Array<any>) {

  // clear the save list
  saveListElement.innerHTML = ``;

  savesList.forEach(save => {

    const card = document.createElement('a');
    card.className = 'card card-saves';
    card.href = `./app/?save=${encodeURIComponent(save)}`;
    card.innerHTML = `<div class="card-inner"><h2>${save}</h2><p>Tap to Play!</p></div>`;

    // add to the savesListElement
    saveListElement.appendChild(card);

  });

}