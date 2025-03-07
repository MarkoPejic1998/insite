'use client'

import { Box, Typography } from '@mui/material'
import theme from '../theme'

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				padding: '2rem',
				backgroundColor: theme.palette.secondary.dark, // #344E41 (dark teal)
				color: theme.palette.common.white, // White text
				textAlign: 'center',
			}}>
			<Typography variant="body2">© {new Date().getFullYear()} Insite. All rights reserved.</Typography>
			<Typography
				variant="body2"
				sx={{ marginTop: '0.5rem' }}>
				Empowering Contractors with Real-Time Insights
			</Typography>
		</Box>
	)
}

export default Footer
