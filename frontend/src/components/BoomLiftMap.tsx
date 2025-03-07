'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Box, Typography } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'

interface BoomLiftMapProps {
	boomLifts: BoomLift[]
}

export default function BoomLiftMap({ boomLifts }: BoomLiftMapProps) {
	const southernOntarioCenter: [number, number] = [43.7758, -80.0508] // Erin Coords

	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 2 }}>
				Boom Lift Locations
			</Typography>
			<Box sx={{ height: '400px', width: '100%', position: 'relative' }}>
				<MapContainer
					center={southernOntarioCenter}
					zoom={10}
					style={{ height: '100%', width: '100%' }} // Fill the parent Box
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{boomLifts.map((lift) => (
						<Marker
							key={lift.boom_lift_id}
							position={[lift.latitude, lift.longitude]}>
							<Popup>
								<Typography>ID: {lift.boom_lift_id}</Typography>
								<Typography>Subcontractor: {lift.subcontractor}</Typography>
								<Typography>Date: {lift.date}</Typography>
								<Typography>Hours: {lift.hours}</Typography>
								<Typography>Phase: {lift.phase}</Typography>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</Box>
		</Box>
	)
}
