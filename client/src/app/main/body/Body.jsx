import React from 'react'
import CodePane from './CodePane'
import FilesPane from './FilesPane'
import { makeStyles } from '@material-ui/core/styles'
import BodyHeader from './BodyHeader'

const useStyles = makeStyles({
	body: {
		background: '#444546',
		flex: '1',
		display: 'flex',
		flexDirection: 'column'
	},
	mainBody: {
		display: 'flex',
		height: '100%'
	}
})

const Body = () => {
	const classes = useStyles()
	return (
		<section className={classes.body} >
			{/*<BodyHeader />*/}
			<section className={classes.mainBody}>
				<CodePane />
				<FilesPane />
			</section>
		</section>
	)
}

export default Body