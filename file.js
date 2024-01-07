import fs from 'node:fs/promises'

async function readPackageJson() {
  let fullPathName = new URL('./package.json', import.meta.url).pathname
  if (process.platform == 'win32') {
    fullPathName = fullPathName.replace('/', '')
  }

  const data = await fs.readFile(fullPathName, 'utf-8')
  console.log(data)
}

readPackageJson();

async function writeFile() {
  let newFile = new URL('./demo.js', import.meta.url).pathname

  if (process.platform == 'win32') {
    // NOTE: On windows, we need to remove the first '/'
    newFile = newFile.replace('/', '')
  }

  await fs.writeFile(newFile, 'console.log(\'yoooooooo!\')')
}

writeFile();