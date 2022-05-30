import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from '@material-ui/core/BreadCrumbs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import CodeIcon from '@material-ui/icons/Code';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Editor from './Editor'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Fade from '@material-ui/core/Fade'
import Grow from '@material-ui/core/Grow'
import { createFile, closeFile, setActiveFile, setSelectedLanguage } from '../../redux/appSlice'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {languages, themes} from './editorOptions'
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
	codePane: {
		width: '75%',
		display: 'flex',
		flexDirection: 'column',
		wordBreak: 'break-word',
	},
	bodyHeader: {
		padding: '10px 14px',
		'&& *': {
			fontSize: '13px'
		},
		'&& ol li': {
			margin: '0 3px',
			fontStyle: 'italic'
		},
		
	},
	paneHeader: {
		background: 'transparent',
		overflow: 'hidden',
		position: 'relative'
	},
	headerItem: {
		width: 'max-content',
	},
	item: {
		float: 'left',
		display: 'flex',
		alignItems: 'center',
		paddingRight: '10px',
		color: '#fff',
		fontSize: '.75rem',
		cursor: 'pointer',
		background: '#2c2c2c',
		margin: '0 2px',
		borderRadius: '20px 20px 0 0',
		'& > span': {
			padding: '9px 10px 9px 15px'
		},
		'& svg.MuiSvgIcon-root': {
			fontSize: '.8rem',
			transition: '.5s ease',
			'&:hover': {
				color: '#fff'
			}
		}
	},
	codeEnv: {
		position: 'relative',
		height: '100%',
		width: '100%'
	},
	downIcon: {
		position: 'absolute',
		right: 0,
		color: '#fff',
		cursor: 'pointer',
		'& svg': {
			fontSize: '1.8rem',
			color: '#d5d5d5',
			display: 'flex',
			alignItems: 'center',
			'&:hover': {
				color: '#fff'
			}
		}
	},
	highlightBg: {
		background: 'rgba(0, 0, 0, 0.04)'
	},
	env: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	clickToCreate: {
		flex: 1
	},
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
	console: {
		border: '1px solid #4e4e4e',
		height: '100px',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		background: '#222',
		'& textarea': {
			height: '100%',
			outline: 'none',
			background: 'inherit',
			color: '#fff',
			fontSize: '1rem',
			resize: 'none'
		}
	},
	closeConsole: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: '3px 5px',
		'& svg': {
			color: '#c1c1c1'
		}
	}
})

const CodePaneHeader = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const files = useSelector(state => state.app.files)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleCloseFile = (id) => {
		dispatch(closeFile(id))
	}
	const handleMenu = (e) => {
		setAnchorEl(e.target)
	}
	const handleSetActive = (id) => {
		dispatch(setActiveFile(id))
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<header className={classes.paneHeader} >
			<div className={classes.headerItem}>
				{
					files.map((prop, i) => {
						const color = prop.active ? '#fff' : '#bdbdbd'
						return (
							<Grow in={true} key={i} ><div 
								className={classes.item}
								style={{color: color}} 
							>
								<span onClick={() => handleSetActive(prop.created)} > {prop.title} </span>
								<CloseIcon onClick={() => handleCloseFile(prop.created)} />
							</div></Grow>
						)
					})
				}
			</div>
			<div className={[classes.headerItem, classes.downIcon].join(' ')}>
				<ArrowDropDownIcon onClick={handleMenu} />
				<Menu open={open}
					className={classes.menu}
					disableAutoFocusItem={true}
					anchorOrigin={{
			      vertical: 'top',
			      horizontal: 'right',
			    }}
			    transformOrigin={{
		      vertical: 'top',
		      horizontal: 'right',
		    }}
				 onClose={handleClose} 
				 anchorEl={anchorEl} >
					{
						files.map((prop, i) => {
							return (
								<MenuItem 
									key={i}
									className={prop.active ? classes.highlightBg : ''}
									onClick={() => {
										handleSetActive(prop.created)
										handleClose()
									}}>
									{prop.title}
								</MenuItem>
							)
						})
					}
				</Menu>
			</div>
		</header>
	)
}

const CodePaneFooter = ({language, id, content}) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const [showConsole, setConsole] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState({
		settings: null, language: null
	})
	const handleClose = (el) => {
		setAnchorEl({...anchorEl, [`${el}`]: null})
	}
	const openSelect = (target, language) => {
		setAnchorEl({...anchorEl, [`${language}`]: target})
	}
	const setLanguage = (opt) => {
		dispatch(setSelectedLanguage({language: opt, id: id}))
	}
	const openConsole = () => {
		setConsole(true)
	}
	const closeConsole = () => {
		setConsole(false)
	}
	const runCode = () => {
		// console.log(content)
	}
	
	React.useEffect(() => {
		setConsole(false)
	}, [language])
	return (
		<footer className={classes.footer}>
			{language == 'javascript' && showConsole &&
			<Grow in={showConsole}>
				<section className={classes.console} id='console'>
					<div className={classes.closeConsole} onClick={closeConsole} > <ArrowDropDownIcon /> </div>
					<textarea readOnly >

					</textarea>
				</section>
			</Grow>}
			<div className={classes.footerProp}>
				<div className={classes.footerRight}>
					{ language == 'javascript' &&
						<div className={classes.runCode}>
							<IconButton onClick={() => { 
								!showConsole && openConsole()
								runCode()
							}} >
								<PlayArrowIcon />
							</IconButton>
						</div>
					}
					<div className={classes.fileSettings}>
						<IconButton onClick={({target}) => openSelect(target, 'settings')}>
							<SettingsApplicationsIcon />
						</IconButton>
						<Menu 
							open={Boolean(anchorEl.settings)}
							onClose={() => handleClose('settings')}
							disableAutoFocusItem={true}
							anchorEl={anchorEl.settings}
							anchorOrigin={{
						    vertical: 'top',
						    horizontal: 'left',
						   }}
						   transformOrigin={{
					      vertical: 'center',
					      horizontal: 'center',
						   }}
						>
							{
								<MenuItem onClick={() => handleClose('settings')} >

								</MenuItem>
							}
						</Menu>
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
						disableAutoFocusItem={true}
						anchorOrigin={{
					    vertical: 'top',
					     horizontal: 'left',
					   }}
					   transformOrigin={{
				      vertical: 'center',
				      horizontal: 'center',
					   }}
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

const CodeEnv = ({attr}) => {
	const classes = useStyles()
	const display = attr.active ? 'block' : 'none'
	return (
		<section className={classes.codeEnv} style={{display: display}}>
			<section className={classes.env}>
				<Editor prop={attr} />
				<CodePaneFooter language={attr.language} id={attr.created} content={attr.content} />
			</section>
		</section>
	)
}

const CodePane = () => {
	const files = useSelector(state => state.app.files)

	const classes = useStyles()
	return (
		<section className={classes.codePane}>
			<CodePaneHeader />
			{ files.map((props, i) => {
				return <CodeEnv attr={props} key={i} />
			})
			}
		</section>	
	)
}


export default CodePane