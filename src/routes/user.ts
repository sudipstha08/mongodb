import express from 'express'
import {IUser, User} from '../models/user';

const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
		try {
			await User.create({ name: "Kylee", email: "fsdfdsfsd@gmail.com"})
			const user = await User.findOne({ name: "Kyle"}) as IUser
			// await User.findByName('Kyle')
			user && user?.sayHi()
			res.json({ message: "Users fetched" })
		} catch (err: any) {
			if (err instanceof Error) {
				res.status(500).json({ message: err.message})
			}
		}
})

module.exports =  router 
