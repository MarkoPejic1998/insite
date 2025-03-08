'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Box, Typography } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Function to create a consistent blue marker icon
const createBoomLiftIcon = () => {
	return L.divIcon({
		className: 'custom-div-icon',
		html: `<div style="
			background-color: #1976d2;
			border: 2px solid white;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			box-shadow: 0 0 4px rgba(0,0,0,0.4);
			opacity: 1;
		"></div>`,
		iconSize: [12, 12],
		iconAnchor: [6, 6],
		popupAnchor: [0, -6],
	})
}

interface BoomLiftMapProps {
	boomLifts: BoomLift[]
}

// Component to update map bounds when boomLifts change
function MapUpdater({ boomLifts }: { boomLifts: BoomLift[] }) {
	const map = useMap()

	useEffect(() => {
		if (boomLifts.length > 0) {
			const validBounds = boomLifts
				.filter((lift) => lift.latitude !== null && lift.longitude !== null)
				.map((lift) => [lift.latitude!, lift.longitude!] as [number, number])
			if (validBounds.length > 0) {
				map.fitBounds(validBounds)
			}
		}
	}, [boomLifts, map])

	return null
}

export default function BoomLiftMap({ boomLifts }: BoomLiftMapProps) {
	const southernOntarioCenter: [number, number] = [43.7758, -80.0508]

	console.log('BoomLifts received:', boomLifts)

	// Debug: Check all boom lifts for coordinates
	boomLifts.forEach((lift) => {
		console.log(`Boom lift ${lift.boom_lift_id}: lat=${lift.latitude}, lng=${lift.longitude}, date=${lift.date}`)
	})

	// Get the most recent record for each unique boom_lift_id
	const latestBoomLiftsMap = new Map<string, BoomLift>()

	// Sort boomLifts by date in descending order (newest first)
	const sortedBoomLifts = [...boomLifts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	// Then add to map (this ensures newest entries are processed first)
	sortedBoomLifts.forEach((lift) => {
		if (!latestBoomLiftsMap.has(lift.boom_lift_id)) {
			latestBoomLiftsMap.set(lift.boom_lift_id, lift)
		}
	})

	// Get the values and sort them by boom_lift_id
	const allLatestBoomLifts = Array.from(latestBoomLiftsMap.values()).sort((a, b) => {
		// Extract numeric part if boom_lift_id follows a pattern like "B_GNE_001"
		const getNumericPart = (id: string) => {
			const match = id.match(/(\d+)$/)
			return match ? parseInt(match[1], 10) : 0
		}

		// First try to sort by numeric part
		const numA = getNumericPart(a.boom_lift_id)
		const numB = getNumericPart(b.boom_lift_id)

		if (numA !== numB) {
			return numA - numB
		}

		// If numeric parts are equal or not present, sort alphabetically
		return a.boom_lift_id.localeCompare(b.boom_lift_id)
	})

	// Debug: Check all latest boom lifts for coordinates
	console.log('All latest boom lifts:', allLatestBoomLifts)
	allLatestBoomLifts.forEach((lift) => {
		console.log(`Latest boom lift ${lift.boom_lift_id}: lat=${lift.latitude}, lng=${lift.longitude}`)
	})

	// Filter out entries without coordinates
	const latestBoomLifts = allLatestBoomLifts.filter((lift) => {
		const hasCoordinates =
			lift.latitude !== null &&
			lift.longitude !== null &&
			lift.latitude !== undefined &&
			lift.longitude !== undefined &&
			!isNaN(lift.latitude) &&
			!isNaN(lift.longitude)

		if (!hasCoordinates) {
			console.log(
				`Filtering out boom lift ${lift.boom_lift_id} due to invalid coordinates: lat=${lift.latitude}, lng=${lift.longitude}`
			)
		}

		return hasCoordinates
	})

	console.log('Latest BoomLifts with valid coordinates:', latestBoomLifts)

	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 2 }}>
				Boom Lift Locations (Latest Data)
			</Typography>
			<Box
				sx={{
					height: { xs: '300px', sm: '400px' },
					width: '100%',
					position: 'relative',
					'& .leaflet-container': {
						willChange: 'transform', // Optimize for mobile performance
						transform: 'translateZ(0)', // Force GPU acceleration
					},
				}}>
				<MapContainer
					center={southernOntarioCenter}
					zoom={10}
					style={{ height: '100%', width: '100%' }}
					attributionControl={false} // Remove attribution for cleaner mobile view
					zoomControl={false} // Remove zoom controls for cleaner mobile view
				>
					{/* Add custom zoom control in a better position for mobile */}
					<div className="leaflet-control-container">
						<div className="leaflet-top leaflet-right">
							<div className="leaflet-control-zoom leaflet-bar leaflet-control">
								<a
									className="leaflet-control-zoom-in"
									href="#"
									title="Zoom in"
									role="button"
									aria-label="Zoom in">
									+
								</a>
								<a
									className="leaflet-control-zoom-out"
									href="#"
									title="Zoom out"
									role="button"
									aria-label="Zoom out">
									−
								</a>
							</div>
						</div>
					</div>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<MapUpdater boomLifts={latestBoomLifts} />
					{latestBoomLifts.length > 0 ? (
						// Create a map to track coordinates that have been used
						(() => {
							const usedCoordinates = new Map<string, number>()

							return latestBoomLifts.map((lift) => {
								// Create a key for the coordinates
								const coordKey = `${lift.latitude},${lift.longitude}`

								// Check if these coordinates have been used before
								const offsetCount = usedCoordinates.get(coordKey) || 0

								// Update the count for these coordinates
								usedCoordinates.set(coordKey, offsetCount + 1)

								// Calculate a small offset if this coordinate has been used before
								// Each subsequent marker at the same location gets a slightly larger offset
								const offsetLat = offsetCount * 0.0005
								const offsetLng = offsetCount * 0.0005

								// Apply the offset to create a slightly different position
								const position: [number, number] = [
									lift.latitude! + offsetLat,
									lift.longitude! + offsetLng,
								]

								// Create consistent blue icon
								const icon = createBoomLiftIcon()

								return (
									<Marker
										key={lift.id}
										position={position}
										icon={icon}>
										<Popup>
											<Typography
												variant="subtitle1"
												sx={{ fontWeight: 'bold' }}>
												ID: {lift.boom_lift_id}
											</Typography>
											<Typography>Subcontractor: {lift.subcontractor}</Typography>
											<Typography>Site: {lift.site || 'N/A'}</Typography>
										</Popup>
									</Marker>
								)
							})
						})()
					) : (
						<Typography>No valid boom lift locations to display.</Typography>
					)}
				</MapContainer>
			</Box>
		</Box>
	)
}
