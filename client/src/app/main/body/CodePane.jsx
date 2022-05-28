import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from '@material-ui/core/BreadCrumbs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Editor from './Editor'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Fade from '@material-ui/core/Fade'
import { createFile, closeFile, setActiveFile, setSelectedLanguage } from '../../redux/appSlice'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {languages, themes} from './editorOptions'

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
		height: '24px',
		background: '#444546',
		fontSize: '12.5px',
	},
	footerHeader: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%',
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

	},
	console: {
		background: '#222',
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
							<div 
								className={classes.item}
								style={{color: color}} 
								key={i}
							>
								<span onClick={() => handleSetActive(prop.created)} > {prop.title} </span>
								<CloseIcon onClick={() => handleCloseFile(prop.created)} />
							</div>
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

const CodePaneFooter = ({language, id}) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const handleClose = (e) => {
		setAnchorEl(null)
	}
	const openLanguageSelect = (e) => {
		setAnchorEl(e.target)
	}
	const setLanguage = (opt) => {
		dispatch(setSelectedLanguage({language: opt, id: id}))
	}
	const openConsole = () => {

	}
	return (
		<footer className={classes.footer}>
			<div className={classes.footerHeader}>
				<div className={classes.footerRight}>
					<div className={classes.languageOpts}>
						<span 
							className={classes.langSelect}
							onClick={openLanguageSelect}
						 > {language} </span>
					</div>
					<Menu open={Boolean(anchorEl)}
						disableAutoFocusItem={true}
						anchorOrigin={{
					    vertical: 'top',
					     horizontal: 'left',
					   }}
					   transformOrigin={{
				      vertical: 'center',
				      horizontal: 'center',
					   }}
					 	anchorEl={anchorEl} onClose={handleClose} >
						{
							languages.map((opt, i) => {
								return (
									<MenuItem 
										key={i}
										onClick={() => {
											handleClose()
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
			<section className={classes.console}>

			</section>
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
				<CodePaneFooter language={attr.language} id={attr.created} />
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