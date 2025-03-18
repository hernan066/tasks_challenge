const sqlite3 = require("better-sqlite3");
const db = new sqlite3("db/tasks.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

console.log("✅ Base de datos inicializada correctamente.");
db.close();
