import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import BodyHeader from './BodyHeader'
import { Routes, Route } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import CoreScreen from './CoreScreen'

const useStyles = makeStyles({
	body: {
	background: '#3c3c3c',
		flex: '1',
		display: 'flex',
		flexDirection: 'column'
	},
})


const Body = () => {
	const classes = useStyles()
	const showCore = useSelector(state => state.app.showCore)
	return (
		<section className={classes.body} >
			{/*<BodyHeader />*/}
			<CoreScreen />
		</section>
	)
}

export default Body