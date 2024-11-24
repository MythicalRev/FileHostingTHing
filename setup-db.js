// setup-db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./files.db'); // Create a database file if it doesn't exist

// Create a simple table called 'items'
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY, filePath TEXT)");

  // Insert some sample data
  const stmt = db.prepare("INSERT INTO files (filePath) VALUES (?)");
  stmt.run("test");
  stmt.finalize();
});

db.close(() => {
  console.log('Database setup complete');
});
