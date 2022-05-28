import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
	files: [],
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		storeFileContent: (state, action) => {
			state.fileContent = action.payload
		},
		createFile: (state, action) => {
			const newFile = {
				created: Date.now(),
				title: 'untitled',
				active: true,
				content: '',
				language: 'Plain Text'
			}
			state.files.map((prop) => {
				prop.active = false
			})
			state.files = [...state.files, newFile]
			const files = JSON.parse(localStorage.getItem('files')) || []
			localStorage.setItem('files', JSON.stringify([...files, newFile]))
		},
		closeFile: (state, action) => {
			const id = action.payload
			if (state.files.length > 1) {
				const index = state.files.findIndex(i => i.created == id)
				state.files.splice(index, 1)
			}
			if (state.files.findIndex(i => i.active) == -1) {
				state.files[state.files.length - 1].active = true
			}
			const files = JSON.parse(localStorage.getItem('files')) || []
			const index = files.findIndex(i => i.created == id)
			index != -1 && files.splice(index, 1)
			localStorage.setItem('files', JSON.stringify(files))

		},
		setActiveFile: (state, action) => {
			const id = action.payload
			state.files.map((prop) => {
				if (prop.created == id) {
					prop.active = true
				}
				else {
					prop.active = false
				}
			})
		},
		setSelectedLanguage: (state, action) => {
			const {language, id} = action.payload
			state.files.map(i => {
				if (i.created == id) {
					i.language = language
				}
			})
		},
		writeFile: (state, action) => {
			const {id, text} = action.payload
			const index = state.files.findIndex(i => i.created == id)
			state.files[index].content = text
		}
	}
})
export const {
	storeFileContent, 
	createFile, 
	closeFile, 
	setActiveFile, 
	setSelectedLanguage, 
	writeFile
} = appSlice.actions

export default appSlice.reducer