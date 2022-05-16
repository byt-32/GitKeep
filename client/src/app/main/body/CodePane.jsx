import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from '@material-ui/core/BreadCrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles({
	codePane: {
		width: '80%'
	},
	bodyHeader: {
		background: 'linear-gradient(0deg, #606f83, #6c7e97)',
		boxShadow: '1px 0px 20px 8px #434f5e',
		marginTop: '10px',
		padding: '10px 14px',
		'&& *': {
			color: '#fff',
			fontSize: '13px'
		},
		'&& ol li': {
			margin: '0 3px',
			fontStyle: 'italic'
		}
	}
})

const CodePane = () => {
	const classes = useStyles()
	return (
		<section className={classes.codePane}>
			<section className={classes.bodyHeader}>
				<BreadCrumbs separator={<NavigateNextIcon fontSize='small'/>} >
					<Typography> web </Typography>
					<Typography> src </Typography>
					<Typography> main </Typography>
					<Typography> index.html </Typography>
				</BreadCrumbs>
			</section>
		</section>	
	)
}

export default CodePane