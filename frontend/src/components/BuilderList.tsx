import { Typography, Box, List, ListItem, ListItemText, Chip, Divider } from '@mui/material'
import { Builder } from '@/types'
import theme from '@/theme'

interface BuilderListProps {
	builders: Builder[]
}

export default function BuilderList({ builders }: BuilderListProps) {
	// Function to get status color
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Current':
				return theme.palette.success.main
			case 'Past':
				return theme.palette.grey[500]
			case 'Pending':
				return theme.palette.warning.main
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
				Builders
			</Typography>

			<Divider sx={{ mb: 2 }} />

			{builders.length === 0 ? (
				<Typography sx={{ color: theme.palette.text.secondary }}>No builders available</Typography>
			) : (
				<List sx={{ p: 0 }}>
					{builders.map((builder, index) => (
						<Box key={builder.name}>
							<ListItem
								sx={{
									px: 0,
									py: 1.5,
								}}>
								<ListItemText
									primary={
										<Typography sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
											{builder.name}
										</Typography>
									}
									secondary={builder.contact_info}
								/>
								<Chip
									label={builder.status}
									size="small"
									sx={{
										backgroundColor: getStatusColor(builder.status),
										color: 'white',
										fontWeight: 'bold',
									}}
								/>
							</ListItem>
							{index < builders.length - 1 && <Divider />}
						</Box>
					))}
				</List>
			)}
		</Box>
	)
}
