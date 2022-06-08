import express from 'express'
import UserSettings from '../models/UserSettings.js'
import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'

const settingsRoute = express.Router()

settingsRoute.post('/:id', async (req, res) => {
	const {id} = req.params
	const { obj } = req.body

	const findInUser = await User.findOne({_id: id}, {_id: 1})

	// console.log(findInUser)
	if (findInUser !== null) {
		const findInSettings = await UserSettings.findOne({_id: id})
		if (findInSettings === null) {
			const settings = new UserSettings({
				_id: findInUser._id,
				editorSettings: {
					...obj
				}
			})
			settings.save((err, doc) => doc && res.send(doc.editorSettings))
		} else {
			const update = await UserSettings.findOneAndUpdate(
				{_id: id}, 
				{editorSettings: {...findInSettings.editorSettings, ...obj}},
				{upsert: true, new: true}
			)
			// console.log(update)
			res.send(update.editorSettings)
			// console.log(findInSettings)
		}
	}
})

settingsRoute.get('/:id', async (req,res) => {
	// console.log(req.params)
})

export default settingsRoute