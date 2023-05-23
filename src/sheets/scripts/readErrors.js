/* eslint-disable no-undef */

import dotenv from 'dotenv'
import fs from 'fs'
import { authentication } from './authentication.js'

dotenv.config()

async function readErrorSheet() {
  const { auth, googleSheets, spreadsheetId } = await authentication()

  const metadata = await googleSheets.spreadsheets.get({
    auth, spreadsheetId
  })

  const sheet1 = 0
  const range = metadata.data.sheets[sheet1].properties.title

  googleSheets.spreadsheets.values.get({
    auth, spreadsheetId, range
  }).then(response => {
    const { values: rows } = response.data

    const languages = rows[0]

    languages.forEach(language => {
      let line = ''

      rows.forEach((value, index) => {
        if (index === 0) return;
        line += `${value[0]}: '${value[rows[0].indexOf(language)]}', `
      })

      let content = `export const ${language} = { ${line} }`

      fs.writeFile(`./src/sheets/keys/${language}.ts`, content, error => error && console.log(`There was an error in the ${language} file ->`, error))
    })
  })
}

readErrorSheet()