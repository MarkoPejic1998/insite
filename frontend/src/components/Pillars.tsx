'use client'

import { Box, Grid2, Typography, Fade } from '@mui/material'
import theme from '../theme'

const features = [
	{
		title: 'Track Installer Performance',
		description:
			'Monitor your installers’ progress and efficiency with clear, actionable insights—keeping projects on time and within budget.',
		available: true,
	},
	{
		title: 'Monitor Equipment in Real Time',
		description:
			'Know where your heavy equipment is and how it’s performing, so you can maximize uptime and minimize delays.',
		available: true,
	},
	{
		title: 'Manage Everything, Effortlessly',
		description:
			'Handle installer tasks, equipment updates, and team communication in one place—less hassle, more control.',
		available: false,
	},
]

const FeaturesSection = () => {
	return (
		<Box
			sx={{
				padding: '4rem 2rem',
				backgroundColor: theme.palette.background.paper,
				width: '100%', // Ensures full width
			}}>
			<Typography
				variant="h3"
				align="center"
				gutterBottom
				sx={{
					color: theme.palette.primary.dark,
					marginBottom: '3rem',
					fontWeight: 600,
				}}>
				How We Empower Contractors
			</Typography>
			<Grid2
				container
				spacing={2}
				justifyContent="space-between"
				sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }} // Ensures single row on md+
			>
				{features.map((feature, index) => (
					<Grid2
						size={{ xs: 12, sm: 6, md: 4 }} // Explicit sizing: 1/3 width on md+
						key={index}
						sx={{ display: 'flex' }}>
						<Fade
							in={true}
							timeout={300 + index * 300}>
							<Box
								sx={{
									position: 'relative',
									background: feature.available
										? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
										: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
									borderRadius: '12px',
									boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
									padding: '1rem', // Reduced from 1.5rem
									textAlign: 'center',
									transition: 'box-shadow 0.3s ease',
									'&:hover': feature.available
										? {
												boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
												animation: 'pulse 0.6s ease',
										  }
										: {},
									opacity: feature.available ? 1 : 0.85,
									height: '100%',
									minHeight: '200px', // Reduced from 220px
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}>
								<Typography
									variant="h4"
									gutterBottom
									sx={{
										color: theme.palette.common.white,
										fontWeight: 500,
										letterSpacing: '0.02em',
									}}>
									{feature.title}
								</Typography>
								<Typography
									variant="body1"
									sx={{
										color: theme.palette.primary.light,
										lineHeight: 1.7,
									}}>
									{feature.description}
								</Typography>
								{!feature.available && (
									<Box
										sx={{
											position: 'absolute',
											top: '12px',
											right: '12px',
											backgroundColor: theme.palette.secondary.dark,
											color: theme.palette.common.white,
											padding: '0.3rem 0.8rem',
											borderRadius: '6px',
											fontSize: '0.8rem',
											fontWeight: 600,
											boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
										}}>
										Coming Soon
									</Box>
								)}
							</Box>
						</Fade>
					</Grid2>
				))}
			</Grid2>
			<style
				jsx
				global>{`
				@keyframes pulse {
					0% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.05);
					}
					100% {
						transform: scale(1);
					}
				}
			`}</style>
		</Box>
	)
}

export default FeaturesSection
