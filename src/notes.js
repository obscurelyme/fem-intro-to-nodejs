import { getDB, insert, saveDB } from './db.js'

export async function createNote(note, tags) {
  const newNote = {
    content: note,
    id: Date.now(),
    tags,
  }

  await insert(newNote)

  return newNote
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
  const i = db.notes.findIndex(function findById(note) {
    return id == note.id
  })
  const note = {...db.notes[i] }
  db.notes.splice(i, 1)
  await saveDB(db)
  return note
}

export async function clean() {
  const db = await getDB()
  const numNotes = db.notes.length
  db.notes = []
  await saveDB(db)
  return numNotes
}