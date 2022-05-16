import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import styles from '../../styles/css.module.css';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles({
	appBar: {
		background: '#363d48',
		position: 'sticky'
	},
	fileName: {
		display: 'flex',
		alignItems: 'center',
		'&& span, svg': {
			fontSize: '13px',
			cursor: 'pointer',
			margin: '0 3px'
		}
	}
})

const Header = () => {
	const classes = useStyles()
	return (
		<section className={styles.header}>
			<AppBar className={classes.appBar} >
				<Toolbar>
					<section className={styles.headerPrimary} >
						<div className={classes.fileName} >
							<span> index.html</span>
							<CloseIcon style={{fontSize: '11px'}} />
						</div>
					</section>
				</Toolbar>
			</AppBar>
		</section>
	)
}

export default Header