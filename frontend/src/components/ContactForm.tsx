'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Typography, TextField, Button, Fade } from '@mui/material'
import theme from '../theme'

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [status, setStatus] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('Sending...')

		try {
			const response = await fetch('http://localhost:8000/api/contact/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const result = await response.json()
			if (response.ok) {
				setStatus('Message sent successfully!')
				setFormData({ name: '', email: '', message: '' })
			} else {
				console.error('Server response:', result)
				setStatus(result.error || 'Failed to send message. Please try again.')
			}
		} catch (error) {
			console.error('Fetch error:', error)
			setStatus('An error occurred. Please try again.')
		}
	}

	return (
		<Box
			sx={{
				padding: '4rem 2rem',
				background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)',
				borderRadius: '16px',
				boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
				maxWidth: '800px',
				margin: '0 auto',
				mt: 4,
			}}
			id="contact">
			<Fade
				in={true}
				timeout={600}>
				<Box>
					<Typography
						variant="h2"
						align="center"
						gutterBottom
						sx={{
							fontWeight: 700,
							color: theme.palette.primary.dark,
							letterSpacing: '-0.02em',
							fontSize: { xs: '2rem', md: '2.5rem' },
						}}>
						Let’s Talk Details & Get Your Quote
					</Typography>
					<Typography
						variant="body1"
						align="center"
						sx={{
							marginBottom: '2.5rem',
							color: theme.palette.text.secondary,
							maxWidth: '500px',
							margin: '0 auto',
							lineHeight: 1.6,
						}}>
						Reach out to explore our subscription service and receive a custom quote tailored to your needs.
					</Typography>
				</Box>
			</Fade>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					maxWidth: '500px',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}>
				<TextField
					fullWidth
					label="Your Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					variant="outlined"
					required
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							backgroundColor: '#fff',
							transition: 'all 0.3s ease',
							'&:hover fieldset': { borderColor: theme.palette.primary.main },
							'&.Mui-focused fieldset': {
								borderColor: theme.palette.primary.main,
								boxShadow: `0 0 8px ${theme.palette.primary.light}50`,
							},
						},
						'& .MuiInputLabel-root': {
							color: theme.palette.text.secondary,
							'&.Mui-focused': { color: theme.palette.primary.main },
						},
					}}
				/>
				<TextField
					fullWidth
					label="Your Email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					variant="outlined"
					required
					type="email"
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							backgroundColor: '#fff',
							transition: 'all 0.3s ease',
							'&:hover fieldset': { borderColor: theme.palette.primary.main },
							'&.Mui-focused fieldset': {
								borderColor: theme.palette.primary.main,
								boxShadow: `0 0 8px ${theme.palette.primary.light}50`,
							},
						},
						'& .MuiInputLabel-root': {
							color: theme.palette.text.secondary,
							'&.Mui-focused': { color: theme.palette.primary.main },
						},
					}}
				/>
				<TextField
					fullWidth
					label="Your Message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					variant="outlined"
					required
					multiline
					rows={4}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							backgroundColor: '#fff',
							transition: 'all 0.3s ease',
							'&:hover fieldset': { borderColor: theme.palette.primary.main },
							'&.Mui-focused fieldset': {
								borderColor: theme.palette.primary.main,
								boxShadow: `0 0 8px ${theme.palette.primary.light}50`,
							},
						},
						'& .MuiInputLabel-root': {
							color: theme.palette.text.secondary,
							'&.Mui-focused': { color: theme.palette.primary.main },
						},
					}}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{
						padding: '0.75rem',
						borderRadius: '8px',
						fontWeight: 600,
						textTransform: 'none',
						fontSize: '1rem',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						transition: 'all 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
							backgroundColor: theme.palette.primary.dark,
						},
					}}>
					Send Message
				</Button>
				{status && (
					<Typography
						variant="body2"
						align="center"
						sx={{
							mt: 1,
							color: status.includes('success') ? 'green' : 'red',
						}}>
						{status}
					</Typography>
				)}
			</Box>
		</Box>
	)
}

export default ContactForm
