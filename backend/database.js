import sqlite3 from "sqlite3";

const DBSOURCE = "../database/shipmentDB";

export const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
