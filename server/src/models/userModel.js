import mongoose from 'mongoose'

const UserShema = new mongoose.Schema({
	name: {type: String, required: true, index: {unique: true}},
	gmail: { type: String, required: true, index: {unique: true} },
	password: { type: String, required: true},
	userId: {type: String, required: true, index: {unique: true}},
	joined: {type: Date, default: Date.now}
})

const User = mongoose.model('user', UserShema)

export default User