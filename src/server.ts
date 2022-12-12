import express from 'express';
import mongoose, { mongo } from 'mongoose';
import * as dotenv from 'dotenv' 
dotenv.config()

const app = express();
const port = 9000;

mongoose.connect(process.env.DATABASE_URL!)
const db = mongoose.connection

db.on('error', (error) => {
  console.error("error:", error)
})

db.once('open', () => console.log('Connected to database'))
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter)

app.listen(port, () => {
  return console.log(`Express is listening at PORT: ${port}`);
});