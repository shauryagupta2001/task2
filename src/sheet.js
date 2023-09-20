import { google } from 'googleapis';

import key from '../scret.json' assert { type: 'json' };

export const SHEET_ID = '1N4U_v-uhlI6YgPATQufxdaeiFwidCOLLgLPhZoFW2M8';

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
]);
const sheet = google.sheets({ version: 'v4', auth: client });

export default sheet;