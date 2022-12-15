import express from 'express';
import mongoose, { mongo } from 'mongoose';
import * as dotenv from 'dotenv' 
import {IUser, User} from './models/user';
dotenv.config()

const app = express();
const port = 9000;

mongoose.connect(process.env.DATABASE_URL!)
const db = mongoose.connection

db.on('error', (error) => {
  console.error("error:", error)
})

db.once('open', () => console.log('<--------- CONNECTED TO DATABSE ---------->'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter)

async function run() {
  try {
    await User.create({ name: "Kylee", email: "fsdfdsfsd@gmail.com"})
    const user = await User.findOne({ name: "Kylee"}) as IUser
    const Users = new User({})
    // await User.findByName('Kyle')
    user?.sayHi()
  } catch (err: any) {
    console.log("err: ", err.message)
  }
}

app.listen(port, () => {
  return console.log(`<--------- LISTENING AT PORT: ${port}---------->`);
});

run()
