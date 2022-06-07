import React from 'react'

export const useWinHeight = () => {
	const [height, setHeight] = React.useState(`${window.innerHeight}px`)
	window.addEventListener('resize', () => {
		setHeight(`${window.innerHeight}px`)
	})
	return height
}


