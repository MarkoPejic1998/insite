export interface Company {
	name: string
	subcontractor_count: number
	boom_lift_count: number
	builder_count: number
	site_count: number
}

export interface BoomLift {
	id: number
	boom_lift_id: string
	date: string
	hours: number
	latitude: number | null
	longitude: number | null
	subcontractor: string
	phase: string
	builder: string | null
	site: string | null
	oil_level: string | null
	gas_level: string | null
	other_maintenance: string | null
	oil_change: boolean
	oil_change_cost: number
	annual_inspection: boolean
	annual_inspection_cost: number
	ndt: boolean
	ndt_cost: number
	radiator_change: boolean
	radiator_change_cost: number
	company: number
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
