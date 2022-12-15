import mongoose from 'mongoose'

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
	name: String,
	age: Number
})

export default mongoose.model('User', userSchema)