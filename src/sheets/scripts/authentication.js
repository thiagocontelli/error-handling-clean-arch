/* eslint-disable no-undef */

import dotenv from 'dotenv'
import { google } from 'googleapis'

dotenv.config()

export async function authentication() {
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