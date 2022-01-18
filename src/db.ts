/**
 * Provide functions that can operate on every page to make database management easier
 */
import { openDB, deleteDB, IDBPDatabase } from 'idb';

/**
 * Grab the database
 */
export default async function db () {

  return await openDB('taptown', 1, {

    // the database needs to be created or upgraded.
    upgrade (db, oldVersion, newVersion, transaction) {

      // if oldVersion = 0, database is empty and should be established
      if (oldVersion === 0) { 
        // so lets create the saves object store
        db.createObjectStore('saves');

      }

    }

  });

}

/**
 * Get the list of saves
 */
export async function getSavesList (db: IDBPDatabase) {

  // grab the list of keys inside saves
  const saves = db.transaction('saves', 'readonly').objectStore('saves');
  return await saves.getAllKeys();

}

/**
 * Read save
 */
export async function getSave (db: IDBPDatabase, key: string) {

  // start a readonly transaction
  const saves = db.transaction('saves', 'readonly').objectStore('saves');

  // read the key
  return await saves.get(key);

}