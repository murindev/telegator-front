export interface IUseList {
    page?: number
    rows?: number
    orderBy?: string
    direction?: string
}

export interface IPaginate {
    current_page?: number
    data?: any[]
    first_page_url?: string
    from?: number
    last_page?: number
    last_page_url?: string
    links?: any[]
    next_page_url?: string | null
    path?: string
    per_page?: number
    prev_page_url?: string | null
    to?: number
    total?: number
}
