'use client'

import { Box, Typography, Card, CardContent, Divider, Chip } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'

interface SubcontractorActivityProps {
	boomLifts: BoomLift[]
}

export default function SubcontractorActivity({ boomLifts }: SubcontractorActivityProps) {
	// Get the most recent activity for each subcontractor
	const getSubcontractorActivity = () => {
		const subcontractorMap = new Map<string, { lastActivity: Date; boomLiftId: string }>()

		// Process all boom lifts to find the most recent activity for each subcontractor
		boomLifts.forEach((lift) => {
			if (!lift.subcontractor) return

			const activityDate = new Date(lift.date)
			const existing = subcontractorMap.get(lift.subcontractor)

			if (!existing || activityDate > existing.lastActivity) {
				subcontractorMap.set(lift.subcontractor, {
					lastActivity: activityDate,
					boomLiftId: lift.boom_lift_id,
				})
			}
		})

		// Convert to array and sort by most recent activity
		return Array.from(subcontractorMap.entries())
			.map(([name, data]) => ({
				name,
				lastActivity: data.lastActivity,
				boomLiftId: data.boomLiftId,
				daysAgo: Math.floor((new Date().getTime() - data.lastActivity.getTime()) / (1000 * 60 * 60 * 24)),
			}))
			.sort((a, b) => a.lastActivity.getTime() - b.lastActivity.getTime())
	}

	const subcontractorActivity = getSubcontractorActivity()

	return (
		<Card
			sx={{
				backgroundColor: theme.palette.background.paper,
				borderRadius: 2,
				boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
				height: '100%',
			}}>
			<CardContent>
				<Typography
					variant="h6"
					sx={{
						color: theme.palette.text.primary,
						mb: 2,
						fontWeight: 'bold',
					}}>
					Subcontractor Activity
				</Typography>

				<Divider sx={{ mb: 2 }} />

				{subcontractorActivity.length === 0 ? (
					<Typography sx={{ color: theme.palette.text.secondary }}>
						No subcontractor activity data available
					</Typography>
				) : (
					<Box>
						{subcontractorActivity.map((sub) => (
							<Box
								key={sub.name}
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									mb: 2,
									pb: 1,
									borderBottom: `1px solid ${theme.palette.divider}`,
								}}>
								<Box>
									<Typography sx={{ fontWeight: 'medium' }}>{sub.name}</Typography>
									<Typography
										variant="body2"
										sx={{ color: theme.palette.text.secondary }}>
										Last used: {sub.boomLiftId}
									</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{sub.daysAgo > 7 ? (
										<Chip
											label={`${sub.daysAgo} days ago`}
											color="warning"
											size="small"
										/>
									) : (
										<Typography
											variant="body2"
											sx={{ color: theme.palette.success.main }}>
											{sub.daysAgo === 0
												? 'Today'
												: sub.daysAgo === 1
												? 'Yesterday'
												: `${sub.daysAgo} days ago`}
										</Typography>
									)}
								</Box>
							</Box>
						))}
					</Box>
				)}
			</CardContent>
		</Card>
	)
}
