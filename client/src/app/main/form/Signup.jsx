import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Checkbox, Button } from '@material-ui/core'

const useStyles = makeStyles({
	signup: {
		background: '#2c2b3e',
		height: '100%'
	},
	formBody: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		height: '100%',
		padding: '0 40px'
	},
	formProps: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column'
	},
	text: {
		flex: 6,
	},
	form: {
		background: '#fff',
		flex: 4,
		padding: '20px 0 10px 0'
	},
	fieldset: {
		width: '90%',
		'&& .MuiFormControl-root': {
			width: '100%'
		}
	},
	field: {
		marginBottom: '15px',
		'&& label': {
			marginBottom: '8px',
			display: 'block',
			cursor: 'pointer'
		},
		'&& .MuiOutlinedInput-input': {
			padding: '11.5px 14px',
			fontSize: '.96rem'
		}
	},
	input: {

	},
	submit: {
		width: '100%',
		background: '#6c63ff'
	}
})

const Signup = () => {
	const classes = useStyles()
	const [input, setInput] = React.useState({
		name: '', gmail: '', password: ''
	})
	const handleInput = (obj) => {
		setInput({...input, ...obj})
	}
	return (
		<section className={classes.signup}>
			<div className={classes.formBody}>
				<div className={[classes.text, classes.formProps].join(' ')}>
					<div className={classes.header}>
						<h1> </h1>
					</div>
					<div className={classes.textBody} >
						<p> CodeCollab </p>
					</div>
				</div>
				<form className={[classes.form, classes.formProps].join(' ')} >
					<fieldset className={classes.fieldset} >
						<div className={classes.field}>
							<label htmlFor='name'> Name </label>
							<TextField 
								id='name'
								className={classes.input} 
								value={input.name}
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
								variant='outlined' 
								placeholder='Create a strong password'
								onChange={({target}) => handleInput({password: target.value})} 
							/>
						</div>

					</fieldset>
					<fieldset className={classes.fieldset} >
						<div className={classes.field}>
							<Button type='submit' className={classes.submit} > Sign up </Button>
						</div>
					</fieldset>
				</form>
			</div>
		</section>
	)
}

export default Signup