import express from 'express';
import { z, ZodError } from 'zod';
import sheet, { SHEET_ID } from './sheet.js';
const app=express()

const contactFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    age: z.string().min(1, { message: 'Message is required' }),
    status: z.string().min(1, { message: 'Message is required' }),
  });

app.use(express.json());
app.use(express.static('public'))

app.post('/send-message',async  (req, res) => {
    try {
        const body = contactFormSchema.parse(req.body);
    
        // Object to Sheets
        const rows=Object.values(body)
        console.log(rows);
    
        await sheet.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A2:C',
          insertDataOption: 'INSERT_ROWS',
          valueInputOption: 'RAW',
          requestBody: {
            values: [rows],
          },
        });
        res.json({ message: 'Data added successfully' });
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(400).json({ error });
        }
      }
})
app.listen(5000,()=>console.log("localhost:5000"))