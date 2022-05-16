import React from 'react'
import Header from './header/Header'
import Body from './body/Body'
import styles from '../styles/css.module.css'


const Main = () => {
	const [height, setHeight] = React.useState(`${window.innerHeight}px`)
	window.addEventListener('resize', () => {
		setHeight(`${window.innerHeight}px`)
	})

	return (
		<section style={{
			height: height,
			display: 'flex',
			flexDirection: 'column',
		}}>
			<Header />
			<Body />
		</section>
	)
}

export default Main