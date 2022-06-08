import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import CodeIcon from '@material-ui/icons/Code';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import SyncIcon from '@material-ui/icons/Sync';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grow from '@material-ui/core/Grow'
import { setSelectedLanguage, setPreferences } from '../../redux/appSlice'
import Popover from '@material-ui/core/Popover'
import Switch from '@material-ui/core/Switch'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import {languages, themes} from './editorOptions'
import { useSelector, useDispatch } from 'react-redux'
import { Resizable } from 'react-resizable'

const useStyles = makeStyles({
	footer: {
		color: '#fff',
		background: '#444546',
		fontSize: '12.5px',
	},
	footerProp: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '28px',
		paddingRight: '10px',
		cursor: 'default',
		'& button.MuiIconButton-root': {
			padding: '0 5px',
			'& svg': {
				color: '#fff'
			}
		}
	},
	footerRight: {
		display: 'flex',
		alignItems: 'center',
		'& > div': {
			marginLeft: '10px'
		}
	},
	highlightBg: {
		background: 'rgba(0, 0, 0, 0.04)'
	},
	console: {
		// border: '2px solid #767676',
		marginRight: '2px',
		boxShadow: 'inset 0 0 3px 0px #afafaf',
		borderBottom: 0,
		height: '100px',
		display: 'flex',
		position: 'relative',
		background: '#222',
		overflowY: 'scroll',
	},

	output: {
		color: 'inherit',
		fontSize: '14px',
		marginRight: '44px',
		flex: 1,
		fontFamily: 'monospace',

		'& #consoleBlock': {
			margin: '5px',
			letterSpacing: '1px',

			'& #objBefore': {
				marginRight: '5px',
				color: '#898989',
				'& svg': {
					fontSize: '.7rem',
					color: '#222'
				}
			}
		},
		
	},
	consoleActions: {
		position: 'sticky',
		top: 0,
		right: 0,
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		'& > button': {
			'& svg': {
				color: '#767676'
			}
		}
	},
	fontPropsItem: {
		padding: '5px 10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		'& .MuiTypography-root': {
			marginRight: '20px'
		}
	},
	textProp: {
		display: 'flex',
		alignItems: 'center',
		'& button': {
			padding: '5px'
		}

	},
	fontSizeAction: {
		'& svg': {
			cursor: 'pointer'
		}
	}
})

const CodePaneFooter = ({language, id, content}) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const menuOpts = {
		disableAutoFocusItem: true,
		anchorOrigin: {
	    vertical: 'top',
	     horizontal: 'left',
	   },
	   transformOrigin: {
      vertical: 'center',
      horizontal: 'center',
	   }
	}
	const [showConsole, setConsole] = React.useState(false)
	const {color_scheme, font_size} = useSelector(state => state.app.editorSettings)
	const [anchorEl, setAnchorEl] = React.useState({
		fontProps: null, language: null, theme: null
	})
	const [code, execute] = React.useState(``)
	const consoleStyle = () => {
		if (color_scheme === 'monokai') return {background: '#272822', color: '#fff'}
		if (color_scheme === 'github') return {background: '#fff', color: '#000'}
		if (color_scheme === 'kuroir') return {background: '#e8e9e8', color: '#000'}
		if (color_scheme === 'twilight') return {background: '#141414', color: '#fff'}
		if (color_scheme === 'xcode') return {background: '#fff', color: '#000'}
		if (color_scheme === 'textmate') return {background: '#fff', color: '#000'}
		if (color_scheme === 'tomorrow') return {background: '#fff', color: '#000'}
		if (color_scheme === 'solarized_light') return {background: '#fdf6e3', color: '#000'}
		if (color_scheme === 'terminal') return {background: '#000', color: '#fff'}
	}
	const closeConsole = () => {
		setConsole(false)
	}
	const clearConsole = () => {
		output.current.innerHTML = ''
	}
	const [consoleProps, setConsoleProps] = React.useState({
		height: 100,
	})
	const innerHTML = (e) => {
		return (`<div id='consoleBlock'>
	 		<span id='objBefore'> >> </span> 
	 		<span >${e}</span>
 		</div>`)
	}
	const output = React.useRef(null)
	const [error, setError] = React.useState(false)
	const [wordWrap, setWordWrap] = React.useState(false)
	const handleClose = (el) => {
		setAnchorEl({...anchorEl, [`${el}`]: null})
	}
	
	const openSelect = (target, language) => {
		setAnchorEl({...anchorEl, [`${language}`]: target})
	}
	const setLanguage = (opt) => {
		dispatch(setSelectedLanguage({language: opt, id: id}))
	}
	
	
	const handleJavaScript = () => {
		output.current !== null && (output.current.innerHTML = '')
		try {
			Function(content)()
		} catch (err) {
			setError(true)
			output.current !== null && (output.current.innerHTML = innerHTML(err))
		}
		console.log = (e) => {
			if(output.current !== null) {
				 if (typeof e === 'string' || typeof e === 'number') {
					output.current.innerHTML += innerHTML(e)
				} 
				if (typeof e === 'object' && !Array.isArray(e)) {
					output.current.innerHTML += innerHTML(JSON.stringify(e))
				}
				if (Array.isArray(e)) {
					output.current.innerHTML += innerHTML(`[${e}]`)
				}
				setError(false)
			}
		}
		!showConsole && setConsole(true)
	}
	React.useEffect(() => console.log(code), [code])
	React.useEffect(() => {
		language !== 'javascript' && setConsole(false)
	}, [language])

	return (

		<footer className={classes.footer}>
			{showConsole &&
			<Grow in={showConsole}>
				<section className={[classes.console].join(' ')} style={{...consoleStyle()}} >
					<div ref={output} 
						className={classes.output}
						style={{color: error ? '#ff4949' : 'inherit', fontSize: `${font_size}px`}} />

					<div className={classes.consoleActions} >
						<IconButton onClick={clearConsole} onDoubleClick={closeConsole} >
							<DeleteForeverIcon />
						</IconButton>
					</div>
				</section>
			</Grow>}
			<div className={classes.footerProp}>
				<div className={classes.footerRight}>
					
					{ language == 'javascript' &&
						<div className={classes.runCode}>
							<IconButton onClick={() => { 
								handleJavaScript()
							}} >
								<PlayArrowIcon />
							</IconButton>
						</div>
					}
					<div className={classes.saveFile}>
						<IconButton>
							<SyncIcon />
						</IconButton>
					</div>
					
					<div className={classes.languageOpts}>
						<span 
							className={classes.langSelect}
							onClick={({target}) => {
								openSelect(target, 'language')
							}}
						 > {language} </span>
					</div>
					<Menu open={Boolean(anchorEl.language)}
						{...menuOpts}
					 	anchorEl={anchorEl.language} onClose={() => handleClose('language')} >
						{
							languages.map((opt, i) => {
								return (
									<MenuItem 
										className={opt == language ? classes.highlightBg : ''}
										key={i}
										onClick={() => {
											handleClose('language')
											setLanguage(opt)
										}}
									>
										{opt}
									</MenuItem>
								)
							})
						}
					</Menu>
				</div>
			</div>
		</footer>
	)
}

export default CodePaneFooter