import React from 'react';
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	
	editor: {
		flex: '1',
		height: '100%',
		width: '100%'
	},
	editorMain: {
		height: '100%',
		width: '100%'
	},
	input: {
		width: '100%',
		height: '100%',
		display: 'block',
		color: '#fff',
		fontSize: '15.5px',
		'&& textarea': {
			height: '100% !important',
			padding: '7px',
			background: 'rgb(67 78 94)',
			overflowY: 'scroll !important'
		},
		'&& textarea::-webkit-scrollbar': {
			width: '8px'
		},
		'&& textarea::-webkit-scrollbar-thumb': {
			background: '#c3c3c3',
			borderRadius: '20px',
			cursor: 'pointer'
		}, 
		'&& textarea::-webkit-scrollbar-track': {
		}
	},
})

const Editor = () => {
	const classes = useStyles()
	const [input, setInput] = React.useState('')
	const handleTextInput = (value) => {
		setInput(value)
	}
	return (
		<section className={classes.editor}>
			<div className={classes.editorMain}>
				<InputBase variant='outlined' multiline minRows={1}       
						maxRows={4}
						onChange={({target}) => handleTextInput(target.value)}
						value={input}
					color='primary' placeholder='write some code' 
					classes={{root: classes.input}} />
			</div>
		</section>
	)
}

export default Editor