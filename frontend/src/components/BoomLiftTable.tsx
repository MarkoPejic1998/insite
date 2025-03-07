import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Button } from '@mui/material'
import { BoomLift } from '@/types'
import theme from '@/theme'

interface BoomLiftTableProps {
	boomLifts: BoomLift[]
	onUploadSuccess?: () => void // Callback to refresh data after successful upload
}

export default function BoomLiftTable({ boomLifts, onUploadSuccess }: BoomLiftTableProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')

	// Handle file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0])
			setUploadStatus('idle') // Reset status when a new file is selected
			setErrorMessage('')
		}
	}

	// Handle file upload
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
			setSelectedFile(null) // Clear the file input after success
			if (onUploadSuccess) {
				onUploadSuccess() // Refresh the data
			}
		} catch (err: any) {
			setUploadStatus('error')
			setErrorMessage(err.message || 'An error occurred during upload')
		}
	}

	return (
		<div>
			<Typography
				variant="h6"
				sx={{ color: theme.palette.text.primary, mb: 2 }}>
				Boom Lift Summary
			</Typography>
			<Box sx={{ mb: 2 }}>
				<Typography
					variant="body1"
					sx={{ mb: 1 }}>
					Upload an Excel file to update boom lifts
				</Typography>
				<input
					type="file"
					accept=".xlsx,.xls"
					onChange={handleFileChange}
				/>
				<Button
					variant="contained"
					onClick={handleUpload}
					disabled={!selectedFile || uploadStatus === 'uploading'}
					sx={{ ml: 2 }}>
					{uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
				</Button>
				{uploadStatus === 'success' && (
					<Typography
						color="success.main"
						sx={{ mt: 1 }}>
						Upload successful
					</Typography>
				)}
				{uploadStatus === 'error' && (
					<Typography
						color="error.main"
						sx={{ mt: 1 }}>
						{errorMessage}
					</Typography>
				)}
			</Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Location (Lat, Lng)</TableCell>
						<TableCell>Hours</TableCell>
						<TableCell>Builder</TableCell>
						<TableCell>Site</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{boomLifts.map((lift) => (
						<TableRow key={lift.boom_lift_id}>
							<TableCell>{lift.boom_lift_id}</TableCell>
							<TableCell>{`${lift.latitude}, ${lift.longitude}`}</TableCell>
							<TableCell>{lift.hours}</TableCell>
							<TableCell>{lift.builder || 'N/A'}</TableCell>
							<TableCell>{lift.site || 'N/A'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
