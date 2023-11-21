import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb implemented');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // store the text
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);
}
// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb implemented');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // get the saved text
  const request = store.getAll(1);
  const result = await request;
  console.log('result.value', result);
  console.error('getDb not implemented')
  // return the saved value
  return result.value;
}

initdb();
