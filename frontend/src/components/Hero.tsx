'use client'

import { Box, Typography, Button, Fade } from '@mui/material'
import theme from '../theme'

const Hero = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				backgroundImage: `linear-gradient(to bottom, rgba(52, 78, 65, 0.3), rgba(52, 78, 65, 0.7)), url(/site_background.jpeg)`,
				backgroundAttachment: 'fixed',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '64px 2rem 0',
				textAlign: 'center',
				marginTop: '0',
				position: 'relative',
			}}>
			<Fade
				in={true}
				timeout={1000}>
				<div>
					{' '}
					{/* Added wrapper */}
					<Box
						sx={{
							backgroundColor: 'rgba(255, 255, 255, 0.1)',
							backdropFilter: 'blur(5px)',
							borderRadius: '16px',
							padding: '2rem 3rem',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
							maxWidth: '800px',
						}}>
						<Typography
							variant="h1"
							sx={{
								color: theme.palette.common.white,
								textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
								letterSpacing: '0.1em',
								fontWeight: 700,
								textTransform: 'uppercase',
								fontSize: { xs: '2rem', md: '3rem' },
							}}>
							Where Contractors Find Clarity
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								color: theme.palette.primary.light,
								marginTop: '1rem',
								fontWeight: 400,
								fontSize: '1.25rem',
								textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
							}}>
							Real-time insights for smarter construction management
						</Typography>
						<Button
							variant="outlined"
							color="primary"
							sx={{
								marginTop: '2rem',
								padding: '0.75rem 2rem',
								borderRadius: '30px',
								color: theme.palette.common.white,
								borderColor: theme.palette.primary.light,
								transition: 'all 0.3s ease',
								'&:hover': {
									backgroundColor: theme.palette.primary.main,
									borderColor: theme.palette.primary.main,
									transform: 'scale(1.05)',
								},
							}}
							href="#contact">
							Get Started
						</Button>
					</Box>
				</div>
			</Fade>
		</Box>
	)
}

export default Hero
