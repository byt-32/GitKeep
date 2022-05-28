import express from 'express'
import User from '../models/userModel.js'
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
			console.log(findGmail, findUser)

			const newUser = await User.create({
				userId: uuidv4(),
				name: body.name,
				gmail: body.gmail,
				password: body.password
			})
			
			newUser && res.send({
				type: 'success',
				login: {name: newUser.name, gmail: newUser.gmail, id: newUser.userId}
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

export default userRoute