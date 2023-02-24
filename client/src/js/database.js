import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  try {
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ value: content });
    await tx.complete;
    console.log("data saved", request.result.value);
  } catch (error) {
    console.error("Error adding content to database", error);
  } finally {
    db.close();
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  try {
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    await tx.complete;
    if (request.result.length > 0) {
      console.log("data retrieved", request.result);
      return request.result;
    } else {
      console.log("data not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving content from database", error);
    return null;
  } finally {
    db.close();
  }
};

initdb();
