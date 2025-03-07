'use client'

import { AppBar, Toolbar, Box, Link as MuiLink } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import theme from '../theme'

const Header = () => {
	return (
		<AppBar
			position="fixed"
			color="transparent"
			elevation={4}
			sx={{
				backgroundColor: theme.palette.secondary.dark, // #344E41 (dark teal)
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
			}}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* Logo on the Left */}
				<Link
					href="/"
					passHref>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Image
							src="/White logo - no background.svg"
							alt="Insite Logo"
							width={150}
							height={50}
							style={{ objectFit: 'contain' }}
							priority
						/>
					</Box>
				</Link>

				{/* Navigation on the Right */}
				<Box>
					<Link
						href="/contractor/dashboard"
						passHref>
						<MuiLink
							sx={{
								color: 'white', // Default color for the link
								textDecoration: 'none', // No underline in normal state
								border: 'none', // Ensure no borders mimic an underline
								transition: 'color 0.3s ease', // Smooth color transition on hover
								'&:visited': {
									color: 'white', // Same color for visited links
									textDecoration: 'none', // No underline for visited links
								},
								'&:hover': {
									color: theme.palette.accent.main, // Change to accent color on hover
									textDecoration: 'none', // No underline on hover
								},
								'&:focus': {
									outline: 'none', // Remove default focus outline
									boxShadow: `0 0 0 2px ${theme.palette.accent.main}`, // Custom focus style
								},
							}}>
							Dashboard
						</MuiLink>
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
