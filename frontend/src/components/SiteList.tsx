import { Typography, Box, List, ListItem, ListItemText, Chip, Divider } from '@mui/material'
import { Site } from '@/types'
import theme from '@/theme'

interface SiteListProps {
	sites: Site[]
}

export default function SiteList({ sites }: SiteListProps) {
	// Function to get status color
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Active':
				return theme.palette.success.main
			case 'Completed':
				return theme.palette.grey[500]
			case 'Planned':
				return theme.palette.info.main
			default:
				return theme.palette.primary.main
		}
	}

	return (
		<Box>
			<Typography
				variant="h6"
				sx={{
					color: theme.palette.text.primary,
					fontWeight: 'bold',
					mb: 2,
				}}>
				Sites
			</Typography>

			<Divider sx={{ mb: 2 }} />

			{sites.length === 0 ? (
				<Typography sx={{ color: theme.palette.text.secondary }}>No sites available</Typography>
			) : (
				<List sx={{ p: 0 }}>
					{sites.map((site, index) => (
						<Box key={site.name}>
							<ListItem
								sx={{
									px: 0,
									py: 1.5,
								}}>
								<ListItemText
									primary={
										<Typography sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
											{site.name}
										</Typography>
									}
									secondary={site.location}
								/>
								<Chip
									label={site.status}
									size="small"
									sx={{
										backgroundColor: getStatusColor(site.status),
										color: 'white',
										fontWeight: 'bold',
									}}
								/>
							</ListItem>
							{index < sites.length - 1 && <Divider />}
						</Box>
					))}
				</List>
			)}
		</Box>
	)
}
