import express from 'express';
import mongoose, { mongo } from 'mongoose';
import * as dotenv from 'dotenv' 
const subscribersRouter = require('./routes/subscribers')
const userRouter = require('./routes/user')

dotenv.config()

const app = express();
const port = 9000;

mongoose.connect(process.env.DATABASE_URL!)
const db = mongoose.connection

db.on('error', (error) => {
  console.error("error:", error)
})

db.once('open', () => console.log('<---------🌱🌱🌱 CONNECTED TO DATABSE 🌱🌱🌱 ---------->'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json())

app.use('/subscribers', subscribersRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  return console.log(`<---------🏃‍♂️🏃‍♂️🏃‍♂️  LISTENING AT PORT: ${port} 🏃‍♂️🏃‍♂️🏃‍♂️---------->`);
});
