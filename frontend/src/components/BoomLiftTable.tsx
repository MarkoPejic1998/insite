'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Button } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'

interface BoomLiftTableProps {
	boomLifts: BoomLift[]
	onUploadSuccess?: () => void
}

export default function BoomLiftTable({ boomLifts, onUploadSuccess }: BoomLiftTableProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0])
			setUploadStatus('idle')
			setErrorMessage('')
		}
	}

	const handleUpload = async () => {
		if (!selectedFile) return

		setUploadStatus('uploading')
		setErrorMessage('')

		const formData = new FormData()
		formData.append('file', selectedFile)

		try {
			const token = localStorage.getItem('access_token')
			if (!token) {
				throw new Error('Authentication token not found')
			}

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contractor/upload-boom-lifts`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Upload failed')
			}

			setUploadStatus('success')
			setSelectedFile(null)
			if (onUploadSuccess) {
				onUploadSuccess()
			}
		} catch (err: unknown) {
			setUploadStatus('error')
			if (err instanceof Error) {
				setErrorMessage(err.message || 'An error occurred during upload')
			} else {
				setErrorMessage('An error occurred during upload')
			}
		}
	}

	// Get most recent record for each boom lift ID
	const latestBoomLifts = boomLifts.reduce((acc, lift) => {
		const existing = acc[lift.boom_lift_id]
		if (!existing || new Date(lift.date) > new Date(existing.date)) {
			acc[lift.boom_lift_id] = lift
		}
		return acc
	}, {} as Record<string, BoomLift>)

	// Convert to array sorted by date (newest first)
	const sortedBoomLifts = Object.values(latestBoomLifts).sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return (
		<Box>
			<Typography
				variant="h6"
				sx={{
					color: theme.palette.text.primary,
					mb: 2,
					fontWeight: 'bold',
				}}>
				Boom Lift Summary
			</Typography>

			<Typography
				variant="body2"
				sx={{
					color: theme.palette.text.secondary,
					mb: 3,
					fontStyle: 'italic',
				}}>
				Showing most recent data for each boom lift.
			</Typography>

			<Box
				sx={{
					mb: 3,
					p: 2,
					backgroundColor: theme.palette.background.default,
					borderRadius: 1,
					border: `1px dashed ${theme.palette.grey[300]}`,
				}}>
				<Typography
					variant="body1"
					sx={{
						mb: 2,
						fontWeight: 'medium',
						color: theme.palette.text.primary,
					}}>
					Upload an Excel file to update boom lifts
				</Typography>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box
						sx={{
							border: `1px solid ${theme.palette.grey[300]}`,
							borderRadius: 1,
							p: 1,
							flex: 1,
						}}>
						<input
							type="file"
							accept=".xlsx,.xls"
							onChange={handleFileChange}
							style={{ width: '100%' }}
						/>
					</Box>
					<Button
						variant="contained"
						onClick={handleUpload}
						disabled={!selectedFile || uploadStatus === 'uploading'}
						sx={{
							ml: 2,
							px: 3,
							py: 1,
							fontWeight: 'bold',
						}}>
						{uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
					</Button>
				</Box>

				{uploadStatus === 'success' && (
					<Typography
						color="success.main"
						sx={{ mt: 2, fontWeight: 'medium' }}>
						✓ Upload successful
					</Typography>
				)}
				{uploadStatus === 'error' && (
					<Typography
						color="error.main"
						sx={{ mt: 2, fontWeight: 'medium' }}>
						✗ {errorMessage}
					</Typography>
				)}
			</Box>

			{/* Make table responsive */}
			<Box sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
				<Table sx={{ minWidth: { xs: 500, sm: 650 } }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
							<TableCell sx={{ fontWeight: 'bold' }}>Boom Lift ID</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Hours</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Sub Contractor</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Site</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBoomLifts.length > 0 ? (
							sortedBoomLifts.map((lift: BoomLift) => {
								return (
									<TableRow
										key={lift.id}
										sx={{
											'&:hover': { backgroundColor: theme.palette.action.selected },
										}}>
										<TableCell sx={{ fontWeight: 'medium' }}>{lift.boom_lift_id}</TableCell>
										<TableCell>{new Date(lift.date).toLocaleDateString()}</TableCell>
										<TableCell>{lift.hours}</TableCell>
										<TableCell>{lift.subcontractor}</TableCell>
										<TableCell>{lift.site || 'N/A'}</TableCell>
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={4}
									align="center">
									<Typography sx={{ py: 2, color: theme.palette.text.secondary }}>
										No boom lift data available
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Box>
		</Box>
	)
}
