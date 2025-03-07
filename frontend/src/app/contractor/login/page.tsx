'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Button, Typography, ThemeProvider } from '@mui/material'
import theme from '@/theme'

export default function ContractorLogin() {
	const [credentials, setCredentials] = useState({ username: '', password: '' })
	const [error, setError] = useState('')
	const router = useRouter()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			})
			const data = await response.json()
			if (response.ok) {
				localStorage.setItem('access_token', data.access)
				router.push('/contractor/dashboard')
			} else {
				setError(data.detail || 'Login failed')
			}
		} catch (err) {
			console.error('Error occurred:', err)
			setError('An error occurred')
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3 }}>
				<Typography
					variant="h4"
					align="center"
					gutterBottom>
					Contractor Login
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Username"
						name="username"
						value={credentials.username}
						onChange={handleChange}
						fullWidth
						margin="normal"
						required
						InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
						sx={{
							'& .MuiOutlinedInput-root': {
								'&:hover fieldset': { borderColor: theme.palette.primary.main },
								'&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
							},
						}}
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={credentials.password}
						onChange={handleChange}
						fullWidth
						margin="normal"
						required
						InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
						sx={{
							'& .MuiOutlinedInput-root': {
								'&:hover fieldset': { borderColor: theme.palette.primary.main },
								'&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
							},
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2, backgroundColor: theme.palette.primary.main }}>
						Log In
					</Button>
					{error && (
						<Typography
							color="error"
							align="center"
							sx={{ mt: 2 }}>
							{error}
						</Typography>
					)}
				</form>
			</Box>
		</ThemeProvider>
	)
}
