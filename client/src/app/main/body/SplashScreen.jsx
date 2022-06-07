import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import CreateIcon from '@material-ui/icons/Create'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import SyncIcon from '@material-ui/icons/Sync'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import image from '../../../../public/images/undraw_no_data_re_kwbl (1).svg'
import Collapse from '@material-ui/core/Collapse'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { closeFile, setActiveFile, showCore } from '../../redux/appSlice'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	splashScreen: {
		height: '100%'
	},
	screenContents: {
		display: 'flex',
		justifyContent: 'space-evenly',
		height: '100%'
	},
	screenItems: {
		color: '#fff',
		paddingTop: '10rem'
	},
	list: {
		position: 'relative',
		// background: 'rgb(133 132 132 / 4%)',
		marginBottom: '5px',
		'&&:hover': {
			background: 'rgb(183 183 183 / 25%)'
		},
		'& *': {
			color: '#fff',
			minWidth: 0
		},
		'& .MuiListItemText-root.MuiListItemText-multiline': {
			marginRight: '115px',
			marginLeft: '5px'
		},
		'& svg': {
			fontSize: '1.3rem'
		}
	},
	recentList: {
		padding: '3px 5px 15px 5px',
		'& .pinIcon': {
			fill: '#adadad'
		},
		'& .delete': {
			fill: '#cbcbcb'
		},
		'& .MuiTypography-body2': {
			color: '#bbb'
		},
		
	},
	ListHeader: {
		display: 'block',
		fontSize: '.99rem'
	},
	actionList: {
		'& .MuiListItemIcon-root': {
			marginRight: '12px',
			'& svg': {
				fontSize: '1.25rem'
			}
		}
	}
})


const File = ({file}) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const lastEdited = new Date(file.lastEdited)
	const [showActions, setActions] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const handleMouseEnter = () => {
		setActions(true)
	}
	const handleMouseLeave = () => {
		setActions(false)
	}
	const handleDialog = (e) => {
		setAnchorEl(e.target)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const deleteFIle = () => {
		// dispatch()
	}
	const handleNextScreen = () => {
		dispatch(showCore(file.created))
	}
	return (
		<ListItem 
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={[classes.recentList, classes.list].join(' ')}
  		onClick={() =>{
  		}}>
    		<ListItemIcon>
    			<IconButton>
		     		<FavoriteBorderIcon className='pinIcon' />
		     	</IconButton>
		    </ListItemIcon>
				{/*<Link to='/core' >*/}
	      	<ListItemText
	      		style={{cursor: 'pointer'}}
	      		onClick={handleNextScreen}
	      		primary={file.title} 
	      		secondary={`Today at ${lastEdited.toLocaleTimeString()}`} />
  			{/*</Link>*/}
      	<Fade in={showActions}>
	      	<ListItemSecondaryAction className={classes.delete} >
	      		<IconButton onClick={handleDialog}>
	      			<DeleteForeverIcon className='delete' />
	      		</IconButton>
	      	</ListItemSecondaryAction>
	      </Fade>
	      <Dialog
	        open={Boolean(anchorEl)}
	        keepMounted
	        onClose={handleClose}
	        aria-labelledby="alert-dialog-slide-title"
	        aria-describedby="alert-dialog-slide-description"
     	 >
        <DialogTitle id="alert-dialog-slide-title"> Delete {file.title} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action will permanently delete this file from your workspace.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
          	handleClose()
          }} color="primary">
            Disagree
          </Button>
          <Button onClick={() => {
          	handleClose()
          	deleteFIle()
          }}
           color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
	)
}

const actionList = [
	{
		action: 'new',
		alt: 'New file'
	},
	{
		action: 'repo',
		alt: 'From repository'
	}
]

const SplashScreen = () => {
	const classes = useStyles()
	const recentFiles = JSON.parse(localStorage.getItem('files')) || []
	return (
		<section className={classes.splashScreen}>
			<div className={classes.screenContents}>
				
				<div className={[classes.misc, classes.screenItems].join(' ')}>

					<Typography variant='body1' component='span' className={classes.ListHeader} > Get started </Typography>

					<List className={classes.actionList}>
						{ actionList.map((action, i) => {
								return (
								 <ListItem button key={i}
									 className={[classes.list, classes.actionList].join(' ')}
									 style={{position: 'relative'}} >
									  <ListItemIcon>
											{ action.action == 'new' ?
								     		<CreateIcon className='newFile' /> :
								     		<SyncIcon className='fromRepo' />
									    }
									 	</ListItemIcon>
							    <ListItemText primary={action.alt} />
								</ListItem>
							)
						})
						}
					</List>
				</div>
				<div className={[classes.recentFiles, classes.screenItems].join(' ')}>
					<Typography variant='body1' 
					component='span' 
					className={classes.ListHeader} > Most Recent </Typography>
					<Collapse in={true}>
						<List component="nav" style={{
							// visibility: !noMatch ? 'visible' : 'hidden'
						}}>
								{
									recentFiles.map((file) => {
										return (
											<File key={file.created} file={file} />
										)
									})

								}
						</List>
					</Collapse>
				</div>
			</div>
		</section>
	)
}

export default SplashScreen