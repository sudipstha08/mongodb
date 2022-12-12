const mongoose = require('mongoose')

/**
 * Subscriber Schema
 */
const subscriberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true 
	},
	subscribedToChannel: {
		type: String,
		required: true 
	},
	subscribedDate: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Subscriber', subscriberSchema)