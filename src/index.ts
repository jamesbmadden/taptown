/**
 * code for the LANDING page (/). Load, create, manage saves before sending user into game
 */
import '@pwabuilder/pwainstall';

import loadDb, { getSavesList, GameSave } from './db';

// get references to elements
const homeCardsElement = document.querySelector('.home-cards');

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

  addButtonListener();

  // get list of saves to add to saves list
  updateSavesList(await getSavesList(db));


}

function addButtonListener () {

  const addButton = document.querySelector('.add-save');

  // when add button is clicked, add new save to indexedDB
  addButton.addEventListener('click', async () => {

    // get the new save name
    // @ts-ignore
    const key = document.getElementById('new-save-name').value;

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

}

/**
 * show the saves in the UI
 */
function updateSavesList (savesList: Array<any>) {

  // first clear out the saves
  homeCardsElement.innerHTML = `<div class="card card-install" onclick="document.querySelector('pwa-install').openPrompt()">
  <div class="card-inner">
    <h2>Install TapTown</h2>
    <p>Add TapTown to your homescreen for easy access and a full app experience.</p>
  </div>
</div>`;

  savesList.forEach(save => {

    const card = document.createElement('a');
    card.className = 'card card-saves';
    card.href = `./app/?save=${encodeURIComponent(save)}`;
    card.innerHTML = `<div class="card-inner"><h2>${save}</h2></div>`;

    // add to the savesListElement
    homeCardsElement.appendChild(card);

  });

  homeCardsElement.innerHTML += `<div class="card card-newsave">
    <div class="card-inner">
      <h2>Add New Save</h2>
      <label for="new-save-name">New Save:</label><input id="new-save-name" name="new-save-name" type="string"><button class="add-save">Add</button>
    </div>
  </div>
</div>`;

  addButtonListener();

}