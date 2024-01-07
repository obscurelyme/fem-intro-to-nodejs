import { jest } from '@jest/globals'; 

jest.unstable_mockModule('../src/db.js', function createMockDB() {
  return {
    getDB: jest.fn(),
    insert: jest.fn(),
    saveDB: jest.fn(),
  }
})

const { getDB, insert, saveDB } = await import('../src/db.js')
const { createNote, getAllNotes, findNotes, removeNote, clean } = await import('../src/notes.js')

beforeEach(function clearDBMocks() {
  insert.mockClear()
  getDB.mockClear()
  saveDB.mockClear()
})

test('newNotes inserts data and returns the data', async () => {
  const note = {
    content: 'Test note',
    tags: ['tag1', 'tag2']
  }
  insert.mockResolvedValue(note)

  const result = await createNote(note)
  expect(result).toEqual(note)
})

test('getAllNotes returns all available notes', async () => {
  getDB.mockResolvedValue({ 
    notes: [
      {
        content: 'Test note #1',
        tags: ['tag1'],
        id: 1
      },
      {
        content: 'Test note #2',
        tags: ['tag2'],
        id: 2
      },
      {
        content: 'Test note #3',
        tags: ['tag3'],
        id: 3
      }
    ]
  })

  const result = await getAllNotes()

  expect(result).toStrictEqual([
    {
      content: 'Test note #1',
      tags: ['tag1'],
      id: 1
    },
    {
      content: 'Test note #2',
      tags: ['tag2'],
      id: 2
    },
    {
      content: 'Test note #3',
      tags: ['tag3'],
      id: 3
    }
  ])
})

test('removeNote will not remove unknown notes', async () => {
  getDB.mockResolvedValue({ 
    notes: [
      {
        content: 'Test note #1',
        tags: ['tag1'],
        id: 1
      },
      {
        content: 'Test note #2',
        tags: ['tag2'],
        id: 2
      },
      {
        content: 'Test note #3',
        tags: ['tag3'],
        id: 3
      }
    ]
  })

  const note = await removeNote(4)

  expect(note).toBe(undefined)
})

test('removeNote will remove an existing note', async () => {
  const mockDB = {
    notes: [
      {
        content: 'Test note #1',
        tags: ['tag1'],
        id: 1
      },
      {
        content: 'Test note #2',
        tags: ['tag2'],
        id: 2
      },
      {
        content: 'Test note #3',
        tags: ['tag3'],
        id: 3
      }
    ]
  }
  getDB.mockResolvedValue(mockDB)

  const note = await removeNote(3)

  expect(note).toStrictEqual({
    content: 'Test note #3',
    tags: ['tag3'],
    id: 3
  })
})