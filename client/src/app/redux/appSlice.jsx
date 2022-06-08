import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

function MutateFileinLS() {

	this.single = (id, attrArr) => {

		if (!Array.isArray(attrArr)) throw Error(`expected an array, but got ${attrArr}`)

		const files = JSON.parse(localStorage.getItem('files')) || []
		const fileInLS = files.find(i => i.created == id)

		attrArr.forEach((arr) => {
			const [attr, value] = arr
			fileInLS[`${attr}`] = value
		})

		localStorage.setItem('files', JSON.stringify(files))
	}
		
	this.all = (attrArr) => {
		if (!Array.isArray(attrArr)) throw Error(`expected an array, but got ${attrArr}`)
		const files = JSON.parse(localStorage.getItem('files')) || []
		files.forEach(file => {
			attrArr.forEach(arr => {
				const [attr, value] = arr
				file[`${attr}`] = value
			})
		})
		localStorage.setItem('files', JSON.stringify(files))
	}
}
const editFileInLS = new MutateFileinLS()

const initialState = {
	files: JSON.parse(localStorage.getItem('files')) || [],
	settingsVisible: false,
	editorSettings: {
		color_scheme: 'monokai',
		font_size: 14,
		tab_size: 2,
		"show_gutter": true,
	  "enable_snippets": true,
	}
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		storeFileContent: (state, action) => {
			state.fileContent = action.payload
		},
		createFile: (state, action) => {
			if (state.files.length < 4) {
				state.files.map((prop, i) => {
					prop.active = false
				})
				const newFile = {
					created: Date.now(),
					title: 'untitled',
					active: true,
					content: '',
					star: false,
					language: 'javascript',
				}
				state.files = [...state.files, newFile]
					
				const files = JSON.parse(localStorage.getItem('files')) || []
				localStorage.setItem('files', JSON.stringify(state.files))
			}
		},
		closeFile: (state, action) => {
			const id = action.payload
			const index = state.files.findIndex(i => i.created == id)
			state.files.splice(index, 1)

			if (state.files.findIndex(i => i.active) == -1 && state.files.length > 0) {
				state.files[state.files.length - 1].active = true
			}

			const files = JSON.parse(localStorage.getItem('files')) || []
			const fileInLS = files.findIndex(i => i.created == id)
			fileInLS != -1 && files.splice(fileInLS, 1)
			localStorage.setItem('files', JSON.stringify(files))

		},
		setActiveFile: (state, action) => {
			const id = action.payload
			state.files.map((prop, i) => {
				prop.active = false
			})
			state.files.find(i => i.created === id).active = true
			
			editFileInLS.all([['active', false]])
			editFileInLS.single(id, [['active', true]])
		},
		setSelectedLanguage: (state, action) => {
			const {language, id} = action.payload
			state.files.map(i => {
				if (i.created == id) {
					i.language = language
				}
			})
			editFileInLS.single(id, [['language', language]])
		},
		setPreferences: (state, action) => {
			state.editorSettings = {...state.editorSettings, ...action.payload}
		},
		writeFile: (state, action) => {
			const {id, text} = action.payload
			const lastEdited = Date.now()
			const index = state.files.findIndex(i => i.created == id)
			state.files[index].content = text
			state.files[index].lastEdited = lastEdited

			editFileInLS.single(id, [['content', text], ['lastEdited', lastEdited]])
		},
		alterSettingsVisible: (state, action) => {
			state.settingsVisible = !state.settingsVisible

		},
		
	}
})
export const {
	storeFileContent, 
	createFile, 
	closeFile, 
	setActiveFile, 
	setSelectedLanguage, 
	setPreferences,
	writeFile,
	alterSettingsVisible
} = appSlice.actions

export default appSlice.reducer