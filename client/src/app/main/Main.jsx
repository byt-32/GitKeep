import React from 'react'
import Header from './header/Header'
import Body from './body/Body'
import WelcomeScreen from './WelcomeScreen'
import Signup from './form/Signup'

const Main = () => {
	const [height, setHeight] = React.useState(`${window.innerHeight}px`)
	window.addEventListener('resize', () => {
		setHeight(`${window.innerHeight}px`)
	})

	return (
		<section style={{
			height: height,
			overflowY: 'scroll',
			display: 'flex',
			flexDirection: 'column',
		}}>
		<Signup />
			{/*<Header />
			<WelcomeScreen />*/}
		</section>
	)
}

export default Main