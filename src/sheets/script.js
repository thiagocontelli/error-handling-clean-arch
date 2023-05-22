/* eslint-disable no-undef */

import fs from 'fs'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

async function authentication() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.CREDENTIALS_PATH,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const client = await auth.getClient()

  const googleSheets = google.sheets({
    version: 'v4',
    auth: client
  })

  const spreadsheetId = process.env.SPREADSHEET_ID

  return {
    auth, client, googleSheets, spreadsheetId
  }
}

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

    const languages = rows[0].slice(1)

    languages.forEach(language => {
      let line = ''

      rows.forEach((value, index) => {
        if (index === 0) return;
        line += `${value[0]}: '${value[rows[0].indexOf(language)]}', `
      })

      let content = `export const ${language} = { ${line} }`

      fs.writeFile(`./src/sheets/${language}.ts`, content, error => error && console.log(`There was an error in the ${language} file ->`, error))
    })
  })
}

readErrorSheet()