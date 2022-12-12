import express, { NextFunction, Request, Response } from 'express'
import Subscriber  from "../models/subscriber"

const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
	try {
		const subscribers = await Subscriber.find()
		res.json(subscribers)
	} catch(err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message})
		}
	}
})	

// Getting one
router.get('/:id', getSubscriber, (req, res: any) => {
	res.json(res.subscriber)

})

async function getSubscriber(req: Request, res: any, next: NextFunction) {
	let subscriber
	try {
		 subscriber = await Subscriber.findById(req.params.id)
		if(subscriber === null ) {
			return 	res.status(404).json({ message: "Cannot find subscriber"})
		}
	}
	catch(err: any) {
		return res.status(500).json({ message: err.message })
	}
	res.subscriber = subscriber
	next()
}

// Creating one
router.post('/', async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel
	})
	try {
		const newSubscriber = await subscriber.save()
		res.status(201).json(newSubscriber)
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message})
		}
	}
})

// Updating one
router.patch('/:id',getSubscriber, async (req, res: any) => {
	console.log("PATCHING =>")
	if (req.body.name !== null) {
		res.subscriber.name = req.body.name
	}
	if (req.body.subscribedToChannel !== null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel
	}

	try {
		const updatedSubscriber = await res.subscriber.save()
		res.json(updatedSubscriber)
	} catch (err: any) {
		res.status(400).json({ message: err.message})
	}

})

// Deleting one
router.delete('/:id', getSubscriber,async(req, res: any) => {
	
	try{ 
		await res.subscriber.remove()
		res.json({ message: "Deleted subscriber"})
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message})
		}
	}
})

module.exports =  router 