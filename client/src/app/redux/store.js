import { configureStore } from '@reduxjs/toolkit'
import slice from './slice'

const store = configureStore({
	reducer: {
		store: slice
	}
})

export default store

