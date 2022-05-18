import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import image from '../../../public/images/undraw_live_collaboration_re_60ha (1).svg';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from './header/Header'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	screen: {
		background: '#2c2b3e',
		flex: 1,
		padding: '50px 0',
		position: 'relative'
	},
	main: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	intro: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		margin: '0 auto',
		width: '90%',
		height: '100%',
		['@media (max-width: 1080px)']: {
			width: '100%'
		},
		['@media (max-width: 680px)']: {
			flexDirection: 'column-reverse',
			width: 'initial',
			padding: '20px'
		},
		
	},
	join: {
		background: '#6c63ff',
		alignSelf: 'flex-start',
		marginTop: '15px',
		fontSize: '15px',
		borderRadius: '5px',
		cursor: 'pointer',
		'&& a': {
			textDecoration: 'none',
			color: '#fff',
			padding: '7px 14px',
			display: 'block'
		}
	},
	text: {
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100%',
		width: '40%',
		padding: '0 32px 0 0',
		'&& p': {
			fontSize: '1.05rem',
			margin: '15px 0',
			['@media (max-width: 680px)']: {
				fontSize: '1rem'
			}
		},
		'&& header h1': {
			lineHeight: '1',
			fontSize: '2.1rem',
			['@media (max-width: 680px)']: {
				fontSize: '2rem'
			}
		},
		['@media (max-width: 680px)']: {
			width: '80%'
		},
		['@media (max-width: 575px)']: {
			width: '88%'
		},
	},
	img: {
		width: '40%',
		['@media (max-width: 680px)']: {
			alignSelf: 'flex-end',
			width: '35%'
		},
		['@media (max-width: 575px)']: {
			display: 'none'
		},
		
	},
	textBody: {
		padding: '20px 0 0 0'
	},
	getStarted: {
		position: 'absolute',
		bottom: '0',
		display: 'flex',
		cursor: 'pointer',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '8px',
		width: '100%',
		background: 'linear-gradient(2deg, #29283a, #2a293c)',
		color: '#fff',
		'&& svg': {
			color: '#fff'
		}
	}

})

const WelcomeScrren = () => {
	const [showEle, setEle] = React.useState(true)
	const [currentSlide, setSlide] = React.useState({
		h1: 'Collaborate, build without stress.', 
		p: 'Run faster builds with efficient team collab, see code commits while they happen.'
	})
	React.useEffect(() => {
		// setInterval(() => {
		// 	setEle(true)
		// }, 200)
	}, [])
	const classes = useStyles()
	return (
		<> <Header />
		<section className={classes.screen}>
			<div className={classes.main}>
				<Fade in={showEle} timeout={1000}>
					<div className={classes.intro}>
						<div className={[classes.text].join(' ')}>
							<header className={classes.headerText}>
								<h1> {currentSlide.h1} </h1>
								<p> {currentSlide.p} </p>
							</header>
							<div className={classes.join} >
								<Link to='/signup'> Join for free </Link>
							</div>
						</div>
						<div className={[classes.img].join(' ')}>
							<img src={image} height='100%' width='100%' />
						</div>
					</div>
				</Fade>
				<div className={classes.getStarted}>
					<div className={classes.clickable}> <span> Get started </span></div>
					<div className={classes.clickable}><KeyboardArrowDownIcon /></div>
				</div>
			</div>
		</section></>
	)
}

export default WelcomeScrren