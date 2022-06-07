import React from 'react';
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import { useSelector, useDispatch } from 'react-redux'
import { writeFile } from '../../redux/appSlice'
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";
import {languages, themes} from './editorOptions'

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

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
const storeToLS = (prop, value) => {
	const files = JSON.parse(localStorage.getItem('files'))
	if (files === undefined) {
		localStorage.setItem('files', JSON.stringify([prop]))
		storeToLS(prop, value)
	}
	const find = files.find(i => i.created == prop.created)
	if (find === undefined) {
		localStorage.setItem('files', JSON.stringify([...files, prop]))
		storeToLS(prop, value)
	} else {
		find.content = value
		localStorage.setItem('files', JSON.stringify(files))
	}
	
}
const Editor = ({prop}) => {
	const {currentTheme, fontSize} = useSelector(state => state.app.preferences)
	const classes = useStyles()
	const dispatch = useDispatch()
	const [input, setInput] = React.useState('')
	const onChange = (value) => {
		dispatch(writeFile({id: prop.created, text: value}))
		// storeToLS(prop, value)
	}
	const handleError = (e) => {
		console.log(e)
	}
	const onLoad = () => {

	}


	return (
		<section className={classes.editor}>
			<div className={classes.editorMain}>
				<AceEditor
				  mode={prop.language}
				  theme={currentTheme}
				  name='filename'
				  height='100%'
				  width='100%'
				  enableSnippets
				  value={prop.content}
				  onLoad={onLoad}
				  onChange={onChange}
				  onChangeAnnoation={handleError}
				  fontSize={fontSize}
				  showPrintMargin={true}
				  showGutter={true}
				  highlightActiveLine={true}
				  setOptions={{
					  enableBasicAutocompletion: true,
					  enableLiveAutocompletion: true,
					  enableSnippets: true,
					  showLineNumbers: true,
					  tabSize: 2,
					  useWrapMode: true,
					  indentedSoftWrap: false
				 	}}
				/>
			</div>
		</section>
	)
}

export default Editor