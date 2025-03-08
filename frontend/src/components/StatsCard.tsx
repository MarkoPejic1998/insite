import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material'
import { Company } from '@/types'
import theme from '@/theme'

interface StatsCardProps {
	company: Company
	error: string
}

export default function StatsCard({ company, error }: StatsCardProps) {
	// Define stat items with icons
	const statItems = [
		{
			label: 'Boom Lifts',
			value: company.boom_lift_count,
			icon: '🏗️',
		},
		{
			label: 'Builders',
			value: company.builder_count,
			icon: '👷',
		},
		{
			label: 'Sites',
			value: company.site_count,
			icon: '🏢',
		},
		{
			label: 'Subcontractors',
			value: company.subcontractor_count,
			icon: '🚚',
		},
	]

	return (
		<Card
			sx={{
				backgroundColor: theme.palette.background.paper,
				borderRadius: 2,
				boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
				overflow: 'hidden',
				transition: 'all 0.3s ease',
				'&:hover': {
					boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
				},
			}}>
			<Box
				sx={{
					background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
					p: 3,
					color: 'white',
				}}>
				<Typography
					variant="h6"
					sx={{ fontWeight: 'bold', opacity: 0.9, mb: 0.5 }}>
					Welcome to
				</Typography>
				<Typography
					variant="h4"
					sx={{ fontWeight: 'bold' }}>
					{company.name}
				</Typography>
			</Box>

			<CardContent sx={{ p: 3 }}>
				{error && (
					<Typography
						color="error"
						sx={{ mb: 2 }}>
						{error}
					</Typography>
				)}

				<Typography
					variant="h6"
					sx={{
						color: theme.palette.text.primary,
						mb: 3,
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
					}}>
					<span style={{ marginRight: '8px' }}>📊</span> Company Overview
				</Typography>

				<Grid
					container
					spacing={2}>
					{statItems.map((item) => (
						<Grid
							item
							xs={6}
							key={item.label}>
							<Paper
								elevation={0}
								sx={{
									p: 2,
									borderRadius: 2,
									backgroundColor: theme.palette.background.default,
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.2s ease',
									'&:hover': {
										transform: 'translateY(-2px)',
										boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
									},
								}}>
								<Typography
									sx={{
										fontSize: '24px',
										mb: 1,
									}}>
									{item.icon}
								</Typography>
								<Typography
									sx={{
										color: theme.palette.primary.main,
										fontWeight: 'bold',
										fontSize: '1.5rem',
										mb: 0.5,
									}}>
									{item.value}
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: theme.palette.text.secondary, fontWeight: 'medium' }}>
									{item.label}
								</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	)
}
