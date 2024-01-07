import { getDB, insert, saveDB } from './db.js'

export async function createNote(note, tags) {
  const newNote = {
    content: note,
    id: Date.now(),
    tags,
  }

  return await insert(newNote)
}

export async function getAllNotes() {
  return (await getDB()).notes
}

export async function findNotes(filter) {
  const db = await getDB()
  return db.notes.filter(function filterByFilterString(note) {
    return note.content.toLowerCase().includes(filter)
  })
}

export async function removeNote(id) {
  const db = await getDB();
  const note = db.notes.find(function findById(note) {
    return id == note.id
  })
  if (note) {
    const newDb = db.notes.filter((n) => {
      return n.id != note.id
    })
    await saveDB(newDb)
  }
  return note
}

export async function clean() {
  const db = await getDB()
  const numNotes = db.notes.length
  db.notes = []
  await saveDB(db)
  return numNotes
}