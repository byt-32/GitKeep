import express from 'express'
import User from '../models/UserModel.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
	const { body } = req
	try {
		const findUser = await User.findOne({name: body.name})
		const findGmail = await User.findOne({gmail: body.gmail})
		body.password = await bcrypt.hash(body.password, 5)

		if (findUser === null && findGmail === null) {
			const newUser = new User({
				userId: uuidv4(),
				name: body.name,
				gmail: body.gmail,
				password: body.password
			})

			newUser.save((err, doc) => {
				if (doc) {
					res.send({
						type: 'success',
						login: {
							name: doc.name,
							gmail: doc.gmail,
							id: doc._id
						}
					})
				}
			})

			
		} else {
			res.send({
				type: 'error',
				message: 'username or gmail been taken'
			})
		}
	} catch(err) {

	}
})

userRoute.get('/callback', (req, res) => {
	console.log(req)
})

export default userRoute