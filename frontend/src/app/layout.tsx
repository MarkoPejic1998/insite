'use client'

import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import './globals.css'
import 'leaflet/dist/leaflet.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/browser_favicon.png"
				/>
			</head>
			<body>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</body>
		</html>
	)
}
