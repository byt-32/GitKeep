import mongoose from 'mongoose'

const editorSettingsSchema = new mongoose.Schema({
	color_scheme: String,
	font_size: Number,
	tab_size: Number,
	show_gutter: Boolean,
	enabe_snippets: Boolean
})

const settingsSchema = new mongoose.Schema({
	_id: String,
	editorSettings: Object
})

const UserSettings = mongoose.model('userSettings', settingsSchema) 
export default UserSettings