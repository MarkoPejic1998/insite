import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'

interface BoomLiftTableProps {
	boomLifts: BoomLift[]
}

export default function BoomLiftTable({ boomLifts }: BoomLiftTableProps) {
	return (
		<div>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 2 }}>
				Boom Lift Summary
			</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Location (Lat, Lng)</TableCell>
						<TableCell>Hours</TableCell>
						<TableCell>Builder</TableCell>
						<TableCell>Site</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{boomLifts.map((lift) => (
						<TableRow key={lift.boom_lift_id}>
							<TableCell>{lift.boom_lift_id}</TableCell>
							<TableCell>{`${lift.latitude}, ${lift.longitude}`}</TableCell>
							<TableCell>{lift.hours}</TableCell>
							{/* Builder might be null */}
							<TableCell>{lift.builder || 'N/A'}</TableCell>
							{/* Site might be null */}
							<TableCell>{lift.site || 'N/A'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
