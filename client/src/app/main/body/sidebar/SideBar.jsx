import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import GitHubIcon from '@material-ui/icons/GitHub';
import { v4 as uuidv4 } from 'uuid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux'
import { storeFileContent, createFile } from '../../../redux/appSlice'
import PeopleIcon from '@material-ui/icons/People'


const useStyles = makeStyles({
	sideBar: {
		width: 'auto',
		padding: '24px 0'
	},
	sideBarContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%'
	},
	sideBarHeader: {
		display: 'flex',
		alignItems: 'flex-end',
		flexDirection: 'column',
	},
	menu: {
		'& li.MuiListItem-root': {
			padding: '8px',
			position: 'relative',
			'& a': {
				textDecoration: 'none',
				color: 'inherit',
				display: 'flex'
			},
			'& input': {
				position: 'absolute',
				height: '100%',
				width: '100%'
			},
			'& svg.MuiSvgIcon-root': {
				fontSize: '1.4rem',
				marginLeft: '9px'
			},
			'& span.MuiTypography-body2': {
				width: '100%',
				textAlign: 'left',
				margin: '0 16px'
			}
		},
		
	},
	iconsParent: {
		cursor: 'pointer',
		margin: '5px 10px 10px 10px',
		'& svg': {
			fontSize: '1.6rem',
			transition: '.5s ease color',
			color: '#c7c7c7',
			'&:hover': {
				color: '#fff'
			}
		}
	},
	inputs: {
		position: 'absolute',
		top: 0,
		visibility: 'hidden'
	}
})

const SideBar = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const showAddOptions = (e) => {
		setAnchorEl(e.target)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleFile = (e) => {
		const [file] = e.target.files
		const reader = new FileReader()
		reader.addEventListener('load', () => {
			dispatch(storeFileContent(reader.result))
		})
		if (file) {
			reader.readAsText(file)
		}
	}
	const handleCreateFile = () => {
		dispatch(createFile())
	}
	const getfromGithub = () => {
		
	}
	return (
		<section className={classes.sideBar} >
			<div className={classes.sideBarContent}>
				<div className={classes.sideBarHeader}>
					<div className={classes.iconsParent} 
						onClick={showAddOptions}
					>
						<ImportExportIcon />
					</div>
					
					<Menu open={Boolean(anchorEl)}
						className={classes.menu}
						onClose={handleClose} anchorEl={anchorEl} >
						{/*<label htmlFor='file'>
							<MenuItem onClick={handleClose} >
								<InsertDriveFileIcon />
								<Typography variant='body2' component='span'> File </Typography>
							</MenuItem>
						</label>
						<label htmlFor='folder'>
							<MenuItem onClick={handleClose} >
								<FolderIcon />
								<Typography variant='body2' component='span'> Folder </Typography>
							</MenuItem>
						</label>*/}
						<MenuItem onClick={() => {
							handleClose()
							handleCreateFile()
						}} >
							<CreateIcon />
							<Typography variant='body2' component='span'> New file </Typography>
						</MenuItem>
						<MenuItem onClick={() => {
							handleClose()
							// handleCreateFile()
						}} >
							<CloudUploadIcon />
							<Typography variant='body2' component='span'> Upload </Typography>
						</MenuItem>
						<MenuItem onClick={() => {
							handleClose()
							getfromGithub()
						}} >
							<a href='https://github.com/login/oauth/authorize?client_id=cbfd1f279c8af1175882'> <GitHubIcon />
							<Typography variant='body2' component='span'> GitHub </Typography></a>
						</MenuItem>
					</Menu>
					<div className={classes.inputs}>
						<input type='file' id='file'
							onChange={handleFile} 
							accept='.js,.jsx,.html,.css' 
						/>
						<input type='file' webkitdirectory='true' 
							onChange={handleFile}
							multiple id='folder' 
						/>
					</div>
					<div className={classes.iconsParent}>
						<PeopleIcon />
					</div>
					<div className={classes.iconsParent}>
						<SettingsIcon />
					</div>
				</div>
				<div className={classes.sideBarFooter}>
					
				</div>
				{/*<input type='file' webkitdirectory='true' multiple />*/}
				{/*<header className={classes.sideBarHeader}>
					<h3> FOLDERS </h3>
				</header>
				<section className={classes.files}>
					<Files files={fileStructure} />
				</section>*/}
			</div>
		</section>
	)
}

export default SideBar