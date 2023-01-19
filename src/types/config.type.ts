export type ServerConfig = {
    player_file_path: string
}

export type OverviewHighlight ={
    big: string,
    small?: string,
    description: string
}

export type OverviewHighlights = {
    progress: OverviewHighlight,
    partial: OverviewHighlight,
    absolute: OverviewHighlight,
    not_researched: OverviewHighlight,
    easy: OverviewHighlight
}

export type ItemProgressConfig ={
    any:string,
}