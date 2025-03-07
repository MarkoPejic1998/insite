'use client'

import { AppBar, Toolbar, Box } from '@mui/material'
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
			<Toolbar sx={{ justifyContent: 'center' }}>
				<Link
					href="/"
					passHref>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none', // Still applies to the Link's <a>
						}}>
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
			</Toolbar>
		</AppBar>
	)
}

export default Header
