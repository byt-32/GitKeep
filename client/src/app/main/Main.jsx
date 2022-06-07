import React from 'react'
import Header from './header/Header'
import Body from './body/Body'
import WelcomeScreen from './WelcomeScreen'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useWinHeight } from './utils/customHooks'

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
	}
})


const Main = () => {
	const loginDetails = JSON.parse(localStorage.getItem('user'))
	const classes = useStyles()
	const height = useWinHeight()
	return (
		<section className={classes.main} style={{height: height}} >
			{loginDetails === null ? 
				<Outlet /> :
				<Body />
			}
		</section>
	)
}

export default Main