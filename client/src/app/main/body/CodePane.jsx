import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from '@material-ui/core/BreadCrumbs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Editor from './Editor'
import { useSelector, useDispatch } from 'react-redux'
import Grow from '@material-ui/core/Grow'
import Zoom from '@material-ui/core/Zoom'
import { closeFile, setActiveFile } from '../../redux/appSlice'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import grey from '@material-ui/core/colors/grey';
import CodePaneFooter from './CodePaneFooter'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
	codePane: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		wordBreak: 'break-word',
		position: 'relative'
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
		scrollBehavior: 'smooth'
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
		backdropFilter: 'blur(7px)',
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
	
})

const FileName = ({prop}) => {
	const dispatch = useDispatch()
	const fileName = React.useRef(null)
	const classes = useStyles()
	const color = prop.active ? '#fff' : '#bdbdbd'
	const handleSetActive = () => {
		dispatch(setActiveFile(prop.created))
	}
	const handleCloseFile = () => {
		dispatch(closeFile(prop.created))
	}
	// 	console.log(prop)
	// React.useEffect(() => {
	// }, [prop.active])
	return (
		<Grow in={true} >
			<div 
				ref={fileName}
				className={classes.item}
				style={{color: color}} 
			>
				<span onClick={() => handleSetActive()} > {prop.title} </span>
				<CloseIcon onClick={() => handleCloseFile()} />
			</div>
		</Grow>
	)
}

const CodePaneHeader = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const files = useSelector(state => state.app.files)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	
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
						return (
							<FileName prop={prop} key={prop.created} />
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
									key={prop.created}
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


const CodeEnv = ({attr}) => {
	const classes = useStyles()
	const display = attr.active ? 'block' : 'none'
	return (
		<Grow in={true}>
			<section className={classes.codeEnv} style={{display: display}}>
				<section className={classes.env}>
					<Editor prop={attr} />
					<CodePaneFooter language={attr.language} id={attr.created} content={attr.content} />
				</section>
			</section>
		</Grow>
	)
}

const CodePane = () => {
	const files = useSelector(state => state.app.files)
	
	const classes = useStyles()
	return (
		<section className={classes.codePane}>
			<CodePaneHeader />
			{ files.map((props) => {
					return <CodeEnv attr={props} key={props.created} />
				})
			}
		</section>	
	)
}


export default CodePane