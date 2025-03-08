'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, ThemeProvider, Typography } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StatsCard from '@/components/StatsCard'
import BoomLiftMap from '@/components/BoomLiftMap'
import BoomLiftTable from '@/components/BoomLiftTable'
import BuilderList from '@/components/BuilderList'
import SiteList from '@/components/SiteList'
import theme from '@/theme'
import { DashboardData, BoomLift } from '@/types'
import SubcontractorActivity from '@/components/SubcontractorActivity'

export default function ContractorDashboard() {
	const [data, setData] = useState<DashboardData>({
		company: null,
		boomLifts: [],
		builders: [],
		sites: [],
	})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true) // Track loading state
	const router = useRouter()

	const fetchData = useCallback(async () => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			console.log('No token found, redirecting to login')
			router.replace('/contractor/login')
			return
		}

		setIsLoading(true)
		try {
			const endpoints = ['profile/', 'boom-lifts/', 'builders/', 'sites/']
			const responses = await Promise.all(
				endpoints.map((endpoint) =>
					fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contractor/${endpoint}`, {
						headers: { Authorization: `Bearer ${token}` },
					}).then(async (res) => {
						if (!res.ok) {
							if (res.status === 401) {
								// Token expired or invalid
								console.log(`401 Unauthorized at ${endpoint}, redirecting to login`)
								localStorage.removeItem('access_token') // Clear invalid token
								router.replace('/contractor/login')
								throw new Error('Unauthorized - Redirecting to login')
							}
							throw new Error(`Failed to fetch ${endpoint}`)
						}
						return res.json()
					})
				)
			)
			setData({
				company: responses[0],
				boomLifts: responses[1],
				builders: responses[2],
				sites: responses[3],
			})
			setError('')
		} catch (err) {
			console.error('Error occurred:', err)
			setError('Failed to load data')
			// If not already redirected due to 401, keep error state
		} finally {
			setIsLoading(false)
		}
	}, [router])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	// If no token, don't render anything (handled in fetchData)
	if (!localStorage.getItem('access_token')) {
		return null
	}

	// Loading state
	if (isLoading) {
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ p: 4 }}>
					<Typography>Loading dashboard...</Typography>
				</Box>
			</ThemeProvider>
		)
	}

	// Error state after loading
	if (error && !data.company) {
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ p: 4 }}>
					<Typography color="error">{error}</Typography>
					<Typography>Redirecting to login...</Typography>
				</Box>
			</ThemeProvider>
		)
	}

	// Success state
	// Calculate statistics and active builders/sites from boom lift data
	const calculateDashboardData = () => {
		// Get the most recent record for each unique boom_lift_id
		const latestBoomLiftsMap = new Map<string, BoomLift>()

		// Sort boomLifts by date in descending order (newest first)
		const sortedBoomLifts = [...data.boomLifts].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)

		// Then add to map (this ensures newest entries are processed first)
		sortedBoomLifts.forEach((lift) => {
			if (!latestBoomLiftsMap.has(lift.boom_lift_id)) {
				latestBoomLiftsMap.set(lift.boom_lift_id, lift)
			}
		})

		const latestBoomLifts = Array.from(latestBoomLiftsMap.values())

		// Extract unique builders and sites from boom lift data
		const uniqueBuilders = new Set<string>()
		const uniqueSites = new Set<string>()
		const uniqueSubcontractors = new Set<string>()

		latestBoomLifts.forEach((lift) => {
			if (lift.builder) uniqueBuilders.add(lift.builder)
			if (lift.site) uniqueSites.add(lift.site)
			if (lift.subcontractor) uniqueSubcontractors.add(lift.subcontractor)
		})

		// Create active builders list
		const activeBuilders = Array.from(uniqueBuilders).map((name) => ({
			name,
			contact_info: null,
			status: 'Current',
		}))

		// Create active sites list
		const activeSites = Array.from(uniqueSites).map((name) => ({
			name,
			location: '',
			status: 'Active',
		}))

		// Update company statistics
		const updatedCompany = data.company
			? {
					...data.company,
					boom_lift_count: latestBoomLifts.length,
					builder_count: uniqueBuilders.size,
					site_count: uniqueSites.size,
					subcontractor_count: uniqueSubcontractors.size,
			  }
			: null

		return {
			latestBoomLifts,
			activeBuilders,
			activeSites,
			updatedCompany,
		}
	}

	const { latestBoomLifts, activeBuilders, activeSites, updatedCompany } = calculateDashboardData()

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
				<Header />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						pt: 10,
						pb: 4,
						px: { xs: 2, sm: 4 }, // Smaller padding on mobile
						backgroundColor: theme.palette.background.default,
					}}>
					<Typography
						variant="h4"
						sx={{ mb: 3, color: theme.palette.primary.main, fontWeight: 'bold' }}>
						Dashboard
					</Typography>

					{/* Mobile-friendly layout */}
					<Grid
						container
						spacing={3}>
						{/* Stats Card - Full width on mobile, sidebar on desktop */}
						<Grid
							item
							xs={12}
							lg={3}>
							<Box
								sx={{
									position: { xs: 'static', lg: 'sticky' },
									top: '100px',
									mb: { xs: 3, lg: 0 },
								}}>
								{updatedCompany && (
									<StatsCard
										company={updatedCompany}
										error={error}
									/>
								)}
							</Box>
						</Grid>

						{/* Main Content */}
						<Grid
							item
							xs={12}
							lg={9}>
							{/* Map Section */}
							<Box
								sx={{
									mb: 4,
									p: 3,
									backgroundColor: theme.palette.background.paper,
									borderRadius: 2,
									boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
								}}>
								<BoomLiftMap boomLifts={latestBoomLifts} />
							</Box>

							{/* Table Section */}
							<Box
								sx={{
									mb: 4,
									p: 3,
									backgroundColor: theme.palette.background.paper,
									borderRadius: 2,
									boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
								}}>
								<BoomLiftTable
									boomLifts={data.boomLifts}
									onUploadSuccess={fetchData}
								/>
							</Box>

							{/* Lists Section */}
							<Typography
								variant="h5"
								sx={{
									mt: 4,
									mb: 3,
									color: theme.palette.text.primary,
									fontWeight: 'medium',
									borderLeft: `4px solid ${theme.palette.primary.main}`,
									pl: 2,
								}}>
								Project Overview
							</Typography>

							<Grid
								container
								spacing={3}>
								<Grid
									item
									xs={12}
									md={4}>
									<Box
										sx={{
											height: '100%',
											p: 0,
										}}>
										<SubcontractorActivity boomLifts={data.boomLifts} />
									</Box>
								</Grid>
								<Grid
									item
									xs={12}
									md={4}>
									<Box
										sx={{
											height: '100%',
											p: 3,
											backgroundColor: theme.palette.background.paper,
											borderRadius: 2,
											boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
										}}>
										<BuilderList builders={activeBuilders} />
									</Box>
								</Grid>
								<Grid
									item
									xs={12}
									md={4}>
									<Box
										sx={{
											height: '100%',
											p: 3,
											backgroundColor: theme.palette.background.paper,
											borderRadius: 2,
											boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
										}}>
										<SiteList sites={activeSites} />
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Footer />
			</Box>
		</ThemeProvider>
	)
}
