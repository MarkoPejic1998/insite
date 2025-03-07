import { Card, CardContent, Typography } from '@mui/material'
import { Company } from '@/types' // Updated import
import theme from '@/theme'

interface StatsCardProps {
	company: Company
	error: string
}

export default function StatsCard({ company, error }: StatsCardProps) {
	return (
		<Card sx={{ backgroundColor: theme.palette.background.paper }}>
			<CardContent>
				<Typography
					variant="h6"
					sx={{ color: theme.palette.text.primary }}>
					Welcome, {company.name}
				</Typography>
				{error && <Typography color="error">{error}</Typography>}
				<Typography
					variant="h6"
					sx={{ color: theme.palette.text.primary }}>
					Stats
				</Typography>
				<Typography sx={{ color: theme.palette.text.secondary }}>
					Boom Lifts: {company.boom_lift_count}
				</Typography>
				<Typography sx={{ color: theme.palette.text.secondary }}>Builders: {company.builder_count}</Typography>
				<Typography sx={{ color: theme.palette.text.secondary }}>Sites: {company.site_count}</Typography>
			</CardContent>
		</Card>
	)
}
