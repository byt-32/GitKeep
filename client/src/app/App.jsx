import React from 'react'
import Main from './main/Main'
import { Routes, Route } from 'react-router-dom'
import WelcomeScreen from './main/WelcomeScreen'
import Signup from './main/form/Signup'


const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} > 
				<Route index element={<WelcomeScreen />} />
				<Route path='/signup' element={<Signup />} />
			</Route>
		</Routes>
	)
}

export default App