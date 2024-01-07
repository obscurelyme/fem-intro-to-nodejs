import fs from 'node:fs/promises'

let _db_path = new URL('../db.json', import.meta.url).pathname

if (process.platform == 'win32') {
  _db_path = _db_path.replace('/', '')
}

const DB_PATH = _db_path

/**
 * 
 * @returns {
 *  notes: string[]
 * }
 */
export async function getDB() {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
}

export async function saveDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}

export async function insert(data) {
  const db = await getDB();
  db.notes.push(data)
  await saveDB(db)
  return data
}