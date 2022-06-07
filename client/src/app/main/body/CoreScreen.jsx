import React from 'react'
import CodePane from './CodePane'
import SideBar from './sidebar/SideBar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	mainBody: {
		display: 'flex',
		height: '100%'
	}
})

const CoreScreen = () => {
	const classes = useStyles()
	return (
		<section className={classes.mainBody}>
			<CodePane />
			<SideBar />
		</section>
	)
}

export default CoreScreen