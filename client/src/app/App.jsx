import React from 'react'
import Main from './main/Main'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { Routes, Route } from 'react-router-dom'
import WelcomeScreen from './main/WelcomeScreen'
import Signup from './main/form/Signup'

const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#ffffffb3',
		},
		secondary: {
			main: '#787878'
		}
	}
})

const App = () => {
	return (
		<ThemeProvider theme={theme} >
			<Routes>
				<Route path='/' element={<Main />} > 
					<Route index element={<WelcomeScreen />} />
					<Route path='/signup' element={<Signup />} />
				</Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App