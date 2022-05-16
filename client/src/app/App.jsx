import React from 'react'
import Main from './main/Main'
import { createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme({
	primary: {
		main: '#12151a',
	},
	secondary: {
		main: ''
	}
})

const App = () => {
	return (
		<ThemeProvider theme={theme} >
			<Main />
		</ThemeProvider>
	)
}

export default App