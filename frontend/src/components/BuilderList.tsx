import { Card, CardContent, Typography } from '@mui/material'
import { Builder } from '@/types' // Updated import
import theme from '@/theme'

interface BuilderListProps {
	builders: Builder[]
}

export default function BuilderList({ builders }: BuilderListProps) {
	return (
		<div>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary }}>
				Builders
			</Typography>
			{builders.map((builder) => (
				<Card
					key={builder.name}
					sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
					<CardContent>
						<Typography sx={{ color: theme.palette.text.primary }}>
							{builder.name} - {builder.status}
						</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
