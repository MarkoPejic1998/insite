import { Card, CardContent, Typography } from '@mui/material'
import { Site } from '@/types' // Updated import
import theme from '@/theme'

interface SiteListProps {
	sites: Site[]
}

export default function SiteList({ sites }: SiteListProps) {
	return (
		<div>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary }}>
				Sites
			</Typography>
			{sites.map((site) => (
				<Card
					key={site.name}
					sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
					<CardContent>
						<Typography sx={{ color: theme.palette.text.primary }}>
							{site.name} - {site.status}
						</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
