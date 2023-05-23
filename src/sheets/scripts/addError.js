/* eslint-disable no-undef */

import dotenv from 'dotenv'
import readline from 'readline/promises'
import { authentication } from './authentication.js'

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function addError() {
  const { auth, googleSheets, spreadsheetId } = await authentication()

  const metadata = await googleSheets.spreadsheets.get({
    auth, spreadsheetId
  })

  const sheet1 = 0
  const range = metadata.data.sheets[sheet1].properties.title

  let languages = []

  try {
    const response = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId, range
    })
    
    languages = response.data.values[0].slice(1)
  } catch (error) {
    console.log(error.errors.forEach((error, index) => console.log(`${index + 1}º erro:`, error.message)))
  }

  let keepGoing = 's'

  do {
    const errorCode = await rl.question('Digite o código do erro: ')

    const messages = []

    for (let language of languages) {
      messages.push(await rl.question(`Digite o erro em ${language}: `))
    }

    try {
      await googleSheets.spreadsheets.values.append({
        auth, spreadsheetId, range, resource: { values: [[errorCode, ...messages]] }, valueInputOption: 'RAW'
      })

      console.log('\nMensagem de erro adicionada com sucesso!')
    } catch (error) {
      console.log(error.errors.forEach((error, index) => console.log(`${index + 1}º erro:`, error.message)))
    }

    do {
      keepGoing = await rl.question('\nQuer adicionar mais um erro? [S ou N] ')
    } while (keepGoing.toLowerCase() !== 's' && keepGoing.toLowerCase() !== 'n')
  } while (keepGoing === 's')

  rl.close()
}

addError()