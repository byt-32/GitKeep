import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import AlternateEmail from '@material-ui/icons/AlternateEmail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockSharp from '@material-ui/icons/LockSharp'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import GitHubIcon from '@material-ui/icons/GitHub'

import Header from '../header/Header'

const useStyles = makeStyles({
	signup: {
		background: '#2c2b3e',
		flex: 1,
		padding: '50px 0'
	},
	formBody: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		height: '100%',
		padding: '0 80px',
		flex: 1,
		['@media (max-width: 1080px)']: {
			padding: '0 35px'
		},
		['@media (max-width: 930px)']: {
			padding: '0'
		},
		['@media (max-width: 700px)']: {
			flexDirection: 'column'
		},
	},
	formProps: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column'
	},
	text: {
		['@media (max-width: 700px)']: {
			textAlign: 'center',
			width: '90%',
			'&& > div': {
				width: '100%'
			}
		},
		width: '40%',
		color: '#fff',
		alignItems: 'flex-start',
		marginBottom: '55px'
	},
	header: {
		marginBottom: '10px',
		'&& h1': {
			['@media (max-width: 812px)']: {
				fontSize: '1.8rem'
			},
			fontSize: '2.5rem'
		}
	},
	textBody: {
		'& strong': {
			fontFamily: 'LibreFranklin-Bold'
		},
		'& p': {
			['@media (max-width: 812px)']: {
				fontSize: '1rem'
			},
			fontSize: '1.05rem',
			lineHeight: '1.4'
		}
	},
	form: {
		background: '#fff',
		boxShadow: '1px 0px 20px 6px #45454e',
		padding: '20px 23px 25px 23px',
		['@media (max-width: 700px)']: {
			margin: '0 5px'
		},
	},
	fieldset: {
		width: '100%',
		'&& .MuiFormControl-root': {
			width: '100%'
		}
	},
	field: {
		marginBottom: '16px',
		'&& label': {
			marginBottom: '5px',
			display: 'block',
			cursor: 'pointer'
		},
		'&& .MuiOutlinedInput-input': {
			padding: '11.5px 14px',
			fontSize: '.96rem'
		},
		'&& > .MuiButtonBase-root:hover': {
			background: '#7f77f7'
		},
		'&& .MuiInputAdornment-positionEnd button.MuiButtonBase-root': {
			padding: '4px',
			'&& .MuiIconButton-label .MuiSvgIcon-root': {
				fontSize: '1.3rem'
			}
		}
	},
	input: {

	},
	submit: {
		width: '100%',
		color: '#fff',
		background: '#6c63ff'
	},
	alt: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		'&& h2': {
			marginBottom: '15px',
			fontSize: '1rem',
			textAlign: 'center',
			width: '100%'
		},
	},
	altItem: {
		width: '100%',
		
	},
	icon: {
		borderRadius: '4px',
		color: '#fff',
		padding: '8px 0',
		background: 'linear-gradient(2deg, #2c2b3e, #4c4c4c)',
		fontSize: '.94rem',
		width: '100%',
		'&& .MuiIconButton-label': {
			justifyContent: 'flex-start',
			marginLeft: '10px'
		},
		'&& svg.MuiSvgIcon-root': {
			fontSize: '1.3rem'
		},
		
	},
	labelText: {
		flex: 1
	}
})

const Signup = () => {
	const classes = useStyles()
	const [showPassword, changePasswordVisibility] = React.useState(false)
	const handlePV = () => {
		changePasswordVisibility(!showPassword)
	}
	const [input, setInput] = React.useState({
		name: '', gmail: '', password: ''
	})
	const [feedback, setFeedback] = React.useState({
		open: false,
		type: '',
		value: ''
	})

	const handleInput = (obj) => {
		setInput({...input, ...obj})
	}
	const handleClose = () => {
		setFeedback({open: false, value: '',})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/user/register', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({...input})
		}).then(data => data.json())
		.then(res => {
			console.log(res)
			if (res.type === 'error') {
				setFeedback({
					open: true,
					type: res.type,
					value: res.message
				})
			} else {
				localStorage.setItem('user', JSON.stringify({...res.login}))
				localStorage.setItem('editorSettings', JSON.stringify({
					color_scheme: 'monokai',
					font_size: 14,
					tab_size: 2,
					"show_gutter": true,
				  "enable_snippets": true,
				  wrapEnabled: false
				}))
				window.location.pathname = ''
			}
		})
	}
	return (
		<> 
		<Header />
		<section className={classes.signup}>
			<div className={classes.formBody}>
				<div className={[classes.text, classes.formProps].join(' ')}>
					<div className={classes.header}>
						<h1> Built for developers </h1>
					</div>
					<div className={classes.textBody} >
						<p> CodeTracker was created with the developers use case in mind. It lets you <strong> track code changes in your repo in real-time</strong> . With CodeTracker you don't need to navigate your repo to see those requests (pull, merge), you get notified in real-time. These are just a few perks it has to offer. Sign up to get started. </p>
					</div>
				</div>
				<div className={[classes.form, classes.formProps].join(' ')}>
					<form >
						<fieldset className={classes.fieldset} >
							<div className={classes.field}>
								<label htmlFor='name'> Username </label>
								<TextField 
									id='name'
									className={classes.input} 
									value={input.name}
									required
									autoComplete='username'
									variant='outlined' 
									placeholder='Pick a username'
									onChange={({target}) => handleInput({name: target.value})} 
								/>
							</div>

							<div className={classes.field}>
								<label htmlFor='gmail'> Gmail </label>
								<TextField 
									id='gmail' 
									className={classes.input} 
									value={input.gmail}
									autoComplete='gmail'
									required
									variant='outlined' 
									placeholder='example@gmail.com'
									onChange={({target}) => handleInput({gmail: target.value})} 
								/>
							</div>

							<div className={classes.field}>
								<label htmlFor='password'> Password </label>
								<TextField 
									id='password' 
									className={classes.input} 
									value={input.password}
									required
						    	type={showPassword ? 'text' : 'password'}
									variant='outlined' 
									autoComplete='current-password'
									placeholder='Create a strong password'
									onChange={({target}) => handleInput({password: target.value})} 
									InputProps={{
							    	endAdornment: <InputAdornment position='end' >
							    		<IconButton aria-label='Toggle password visibility' onClick={() => handlePV()}>
							    			{showPassword ? <Visibility /> : <VisibilityOff />}
							    		</IconButton>
							    	</InputAdornment>
							    }}
								/>
							</div>

						</fieldset>
						<fieldset className={classes.fieldset} >
							<div className={classes.field}>
								<Button type='submit' 
									className={classes.submit} 
									onClick={handleSubmit}
									color='primary' > 
									Sign up 
								</Button>
							</div>
						</fieldset>
					</form>
					<div className={classes.alt}>
						<h2 className={classes.h2} > OR </h2>
						<div className={classes.altItem}>
							<IconButton className={classes.icon}>
								<GitHubIcon />
								<span className={classes.labelText} > Continue with Github </span>
							</IconButton>
						</div>
					</div>
				</div>
			</div>
			<Snackbar open={feedback.open} autoHideDuration={6000} onClose={handleClose}>
			  <Alert onClose={handleClose} severity='error'>
			    {feedback.value}
			  </Alert>
			</Snackbar>
		</section></>
	)
}

export default Signup