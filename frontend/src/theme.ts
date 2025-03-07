import { createTheme } from '@mui/material/styles'

// Extend the Material-UI theme to include an accent color
declare module '@mui/material/styles' {
	interface Palette {
		accent: Palette['primary']
	}
	interface PaletteOptions {
		accent?: PaletteOptions['primary']
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#A3B18A', // Medium sage green
			light: '#DAD7CD', // Light grey-green
			dark: '#588157', // Darker green
		},
		secondary: {
			main: '#3A5A40', // Deep forest green
			dark: '#344E41', // Darkest teal
		},
		accent: {
			main: '#D4A373', // Muted orange for interactive elements
		},
		text: {
			primary: '#344E41', // Dark teal for main text
			secondary: '#588157', // Medium green for secondary text
		},
		background: {
			default: '#FFFFFF', // White background for a clean, modern look
			paper: '#F5F5F5', // Light grey for paper surfaces like cards
		},
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif', // Switched to Montserrat for a modern feel
		h1: {
			fontSize: '3rem', // Larger for a bold, modern appearance
			fontWeight: 700,
			color: '#344E41',
		},
		h2: {
			fontSize: '2.5rem',
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
