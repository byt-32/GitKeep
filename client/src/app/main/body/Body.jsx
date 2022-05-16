import React from 'react'
import CodePane from './CodePane'
import FilesPane from './FilesPane'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	body: {
		background: '#4d5a6c',
		padding: '10px 30px',
		flex: '1',
	},
})

const Body = () => {
	const classes = useStyles()
	return (
		<section className={classes.body} >
			<CodePane />
			<FilesPane />
		</section>
	)
}

export default Body