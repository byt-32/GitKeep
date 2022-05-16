import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	filesPane: {

	},
})

const FilesPane = () => {
	const classes = useStyles()
	return (
		<section className={classes.filesPane} >

		</section>
	)
}

export default FilesPane