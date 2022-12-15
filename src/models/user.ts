import {Model,InferSchemaType,Schema,SchemaTypes, model, Document} from 'mongoose'

const addressSchema = new Schema({
	street: String,
	city: String
})

export interface IUser extends Document {
	name?: string
	age: number
	email: string
	createdAt: any
	updatedAt: any
	bestFriend: any
	hobbies: any
	address: any
	sayHi:() => void
	findByName: (name: string) => void
	byName: (name: string) => void
}

/**
 * User Schema
 */
const userSchema = new Schema<IUser>({
	name: String,
	age: {
		type: Number,
		min: 1,
		max: 100,
		/**
		 * Custom validation
		 */
		validate:{
			validator: (v: any) => v % 2 === 0,
			message: (props: any) => `${props.value} is not an even number`
		}
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		minLength: 10,
	},
	createdAt: {
		type:Date, 
		/**
		 * Will never be changed
		 */
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date, 
		default: () => Date.now()
	},
	bestFriend: SchemaTypes.ObjectId, // reference to another object
	hobbies: [String],
	address: addressSchema
})


userSchema.methods.sayHi = function() {
	console.log(`Hi. My name is ${this.name}`)
}

userSchema.statics.findByName = function(name) {
	return this.where({name: new RegExp(name, 'i')})
}

// userSchema.query.byName =function(name) {
// 	return this.find({name: new RegExp(name, 'i')})

// }

/**
 * Middleware
 */
userSchema.pre('save', function(next) {
	this.updatedAt = Date.now()
	next()
})

// userSchema.method('sayHi', function (): void {
// 	console.log(`Hi. My name is ${this.name}`)
// })

export const User =  model<IUser>('User', userSchema, "users")