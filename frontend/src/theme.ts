import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#A3B18A', // Medium sage green as the primary color
			light: '#DAD7CD', // Light grey-green for lighter variants
			dark: '#588157', // Darker green for contrast
		},
		secondary: {
			main: '#3A5A40', // Deep forest green for secondary elements
			dark: '#344E41', // Darkest teal for secondary contrast
		},
		text: {
			primary: '#344E41', // Dark teal for main text (readable on light backgrounds)
			secondary: '#588157', // Medium green for secondary text
		},
		background: {
			default: '#DAD7CD', // Light grey-green as the default background
			paper: '#FFFFFF', // White for paper-like surfaces (e.g., cards)
		},
		common: {
			black: '#000000', // Black for where needed
			white: '#FFFFFF', // White for where needed
		},
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
			color: '#344E41',
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600,
			color: '#344E41',
		},
		body1: {
			fontSize: '1rem',
			color: '#344E41',
		},
	},
})

export default theme
