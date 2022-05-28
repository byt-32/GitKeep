import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
	bodyHeader: {

	},
	headerContent: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '5px'
	},
	headerItem: {

	},
	menuItem: {
		marginRight: '5px'
	}
})

const BodyHeader = () => {
	const classes = useStyles()
	return (
		<section className={classes.bodyHeader}>
			<div className={classes.headerContent}>
				<div className={classes.headerItem}>
					<div className={classes.headerMenu}>
						<span className={classes.menuItem}> File </span> 
						<span className={classes.menuItem}> Preferences </span> 
					</div>
				</div>
				<div className={classes.icon}>
					<SettingsIcon />
				</div>
			</div>
		</section>
	)
}
export default BodyHeader