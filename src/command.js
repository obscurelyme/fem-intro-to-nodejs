import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { createNote, getAllNotes, findNotes, removeNote, clean } from './notes.js'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', function builder(yargs) {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create',
    })
  }, async function curl(argv) {
    const tags = argv.tags ? argv.tags.split(',') : []
    const note = await createNote(argv.note, tags)
    console.log('Created new note:', note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async function () {
    const notes = await getAllNotes()
    console.log(notes)
  })
  .command('find <filter>', 'find a note', function builder(yargs) {
    return yargs.positional('filter', {
      type: 'string',
      description: 'The search term to filter notes by, will be applied to note.content',
    })
  }, async function (argv) {
    const notes = await findNotes(argv.filter)
    console.log(notes)
  })
  .command('remove <id>', 'Remove a note by id', function builder(yargs) {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note to remove'
    })
  }, async function remove(argv) {
    const note = await removeNote(argv.id)
    console.log(`${note} removed`)
  })
  .command('web [port]', 'Launch a website to view all notes', function builder(yargs) {
    return yargs.positional('port', {
      type: 'number',
      default: 5000,
      describe: 'port to bind on'
    })
  }, function web(argv) {
    // TODO: launch http server
  })
  .command('clean', 'Remove all notes', () => {}, async function () {
    await clean()
    console.log('All notes cleaned')
  })
  .demandCommand(1)
  .parse()