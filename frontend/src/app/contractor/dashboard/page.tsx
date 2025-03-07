'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, ThemeProvider } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StatsCard from '@/components/StatsCard'
import BoomLiftMap from '@/components/BoomLiftMap'
import BoomLiftTable from '@/components/BoomLiftTable'
import BuilderList from '@/components/BuilderList'
import SiteList from '@/components/SiteList'
import theme from '@/theme'
import { DashboardData } from '@/types'

export default function ContractorDashboard() {
	const [data, setData] = useState<DashboardData>({
		company: null,
		boomLifts: [],
		builders: [],
		sites: [],
	})
	const [error, setError] = useState('')
	const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			router.replace('/contractor/login') // Use replace instead of push
			return
		}

		const fetchData = async () => {
			try {
				const endpoints = ['profile/', 'boom-lifts/', 'builders/', 'sites/']
				const responses = await Promise.all(
					endpoints.map((endpoint) =>
						fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contractor/${endpoint}`, {
							headers: { Authorization: `Bearer ${token}` },
						}).then((res) => {
							if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)
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
			} catch (err) {
				console.error('Error occurred:', err)
				setError('Failed to load data')
			}
		}

		fetchData()
	}, [router])

	// Move the loading check after useEffect to ensure redirect happens first
	if (!localStorage.getItem('access_token')) {
		return null // Prevent rendering until redirect
	}

	if (!data.company)
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ p: 4 }}>Loading...</Box>
			</ThemeProvider>
		)

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
						px: 4,
						backgroundColor: theme.palette.background.default,
					}}>
					<Grid
						container
						spacing={3}>
						<Grid
							item
							xs={12}
							md={3}>
							<StatsCard
								company={data.company}
								error={error}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={9}>
							<BoomLiftMap boomLifts={data.boomLifts} />
							<BoomLiftTable boomLifts={data.boomLifts} />
							<BuilderList builders={data.builders} />
							<SiteList sites={data.sites} />
						</Grid>
					</Grid>
				</Box>
				<Footer />
			</Box>
		</ThemeProvider>
	)
}
