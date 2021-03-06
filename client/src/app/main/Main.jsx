import React from 'react'
import Header from './header/Header'
import Body from './body/Body'
import WelcomeScreen from './WelcomeScreen'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useWinHeight } from './utils/customHooks'
import { createTheme, ThemeProvider } from '@material-ui/core'

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
	}
})

const bodyTheme = createTheme({
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

const outletTheme = createTheme({
	palette: {
		type: 'light',
	}
})

const Main = () => {
	const loginDetails = JSON.parse(localStorage.getItem('user'))
	const classes = useStyles()
	const height = useWinHeight()
	return (
		<section className={classes.main} style={{height: height}} >
			{loginDetails === null ? 
				<ThemeProvider theme={outletTheme} >
					<Outlet />
				</ThemeProvider> :
				<ThemeProvider theme={bodyTheme} >
					<Body />
				</ThemeProvider>
			}
		</section>
	)
}

export default Main