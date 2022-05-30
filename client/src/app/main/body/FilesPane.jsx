import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import { v4 as uuidv4 } from 'uuid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux'
import { storeFileContent, createFile } from '../../redux/appSlice'

const fileStructure = [
	{type: 'file', files: 'index.jsx'},
	{type: 'folder', files: ['index.jsx']},
	{type: 'file', files: 'index.jsx'},
]

const useStyles = makeStyles({
	filesPane: {
		width: '30%'
	},
	filesPaneHeader: {
		display: 'flex',
		justifyContent: 'flex-end'
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
				marginLeft: '5px'
			},
			'& span.MuiTypography-body2': {
				width: '100%',
				textAlign: 'left',
				margin: '0 13px'
			}
		},
		
	},
	headerIcons: {
		cursor: 'pointer',
		margin: '10px',
		'& svg': {
			fontSize: '2rem',
			color: '#fff'
		}
	},
	inputs: {
		position: 'absolute',
		top: 0,
		visibility: 'hidden'
	}
})

const FilesPane = () => {
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
		<section className={classes.filesPane} >
			<div className={classes.filesPaneContent}>
				<div className={classes.filesPaneHeader}>
					<div className={classes.headerIcons} onClick={showAddOptions}>
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
				</div>
				{/*<input type='file' webkitdirectory='true' multiple />*/}
				{/*<header className={classes.filesPaneHeader}>
					<h3> FOLDERS </h3>
				</header>
				<section className={classes.files}>
					<Files files={fileStructure} />
				</section>*/}
			</div>
		</section>
	)
}

export default FilesPane