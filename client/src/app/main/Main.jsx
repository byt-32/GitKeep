import React from 'react'
import Header from './header/Header'
import Body from './body/Body'
import WelcomeScreen from './WelcomeScreen'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
	}
})

const Main = () => {
	const classes = useStyles()
	const [height, setHeight] = React.useState(`${window.innerHeight}px`)
	window.addEventListener('resize', () => {
		setHeight(`${window.innerHeight}px`)
	})
	return (
		<section className={classes.main} style={{height: height}} >
			<Outlet />
		</section>
	)
}

export default Main