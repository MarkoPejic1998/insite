'use client'

import { Box, Typography, Button, Fade } from '@mui/material'
import theme from '../theme'

// Import Oswald for a unique, bold typography
import '@fontsource/oswald'

const Hero = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				backgroundImage: `linear-gradient(to bottom, rgba(52, 78, 65, 0.1), rgba(52, 78, 65, 0.5)), url(/site_background.jpeg)`,
				backgroundAttachment: 'fixed',
				backgroundPosition: { xs: 'center center', md: 'center 30%' }, // Adjusted for mobile
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: { xs: '64px 1rem 0', md: '64px 2rem 0' },
				textAlign: 'center',
				marginTop: '0',
				position: 'relative',
			}}>
			<Fade
				in={true}
				timeout={2000}>
				<Box
					sx={{
						width: { xs: '90%', md: '800px' }, // Adjusted width for mobile
						maxWidth: '100%',
						margin: { xs: '0 auto', md: '0' }, // Center horizontally on mobile
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						backdropFilter: 'blur(3px)',
						borderRadius: '16px',
						padding: { xs: '1.5rem', md: '2rem 3rem' },
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						alignSelf: 'center', // Extra assurance for flex centering
					}}>
					<Typography
						variant="h1"
						sx={{
							fontFamily: "'Oswald', sans-serif",
							fontSize: { xs: '2rem', md: '4rem' },
							fontWeight: 700,
							color: theme.palette.common.white,
							textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
							letterSpacing: '0.1em',
							textTransform: 'uppercase',
						}}>
						Where Contractors Find Clarity
					</Typography>
					<Typography
						variant="subtitle1"
						sx={{
							fontFamily: "'Montserrat', sans-serif",
							fontSize: { xs: '0.9rem', md: '1.25rem' },
							fontWeight: 400,
							color: theme.palette.common.white,
							marginTop: '1rem',
							textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
						}}>
						Real-time insights for smarter construction management
					</Typography>
					<Button
						variant="contained"
						sx={{
							marginTop: '2rem',
							padding: '0.75rem 2rem',
							borderRadius: '30px',
							backgroundColor: theme.palette.accent.main,
							color: theme.palette.common.white,
							transition: 'all 0.3s ease',
							'&:hover': {
								backgroundColor: theme.palette.accent.dark || theme.palette.accent.main,
								transform: 'scale(1.05)',
								boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
							},
						}}
						href="#contact">
						Get Started
					</Button>
				</Box>
			</Fade>
		</Box>
	)
}

export default Hero
