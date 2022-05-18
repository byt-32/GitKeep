import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import styles from '../../styles/css.module.css';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

const useStyles = makeStyles({
	appBar: {
		background: '#363d48',
		position: 'sticky',
	},
	
	fileName: {
		display: 'flex',
		alignItems: 'center',
		'&& span, svg': {
			fontSize: '13px',
			cursor: 'pointer',
			margin: '0 3px'
		}
	},
	headerItem: {
		'&& .MuiButtonBase-root:hover': {
			background: '#7faef3'
		}
	},
	upload: {
		display: 'flex',
		fontSize: '13px',
		color: '#fff',
		alignItems: 'center',
		background: '#7faef3',
		borderRadius: '6px',
		cursor: 'pointer',
		padding: '5px 13px 5px 5px',
		'&& svg': {
			fontSize: '17px',
			margin: '0 5px'
		}
	},

})

const Header = () => {
	const classes = useStyles()
	return (
		<AppBar className={classes.appBar} >
			<Toolbar className={classes.toolbar}>
				{/*<div className={classes.fileName} >
					<span> index.html</span>
					<CloseIcon style={{fontSize: '11px'}} />
				</div>*/}
				<div className={classes.headerItem}>
					<IconButton className={classes.upload}>
						<CloudDownloadIcon />
						<span> Import </span>
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Header