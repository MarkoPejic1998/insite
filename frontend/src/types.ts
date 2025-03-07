export interface Company {
	name: string
	subcontractor_count: number
	boom_lift_count: number
	builder_count: number
	site_count: number
}

export interface BoomLift {
	boom_lift_id: string
	subcontractor: string
	date: string
	hours: number
	latitude: number
	longitude: number
	phase: string
}

export interface Builder {
	name: string
	contact_info: string | null
	status: string
}

export interface Site {
	name: string
	location: string
	status: string
}

export interface DashboardData {
	company: Company | null
	boomLifts: BoomLift[]
	builders: Builder[]
	sites: Site[]
}
