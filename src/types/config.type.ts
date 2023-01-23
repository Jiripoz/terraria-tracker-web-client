export type ServerConfig = {
    player_file_path: string
}

export type OverviewHighlight ={
    big: string,
    small: string | undefined,
    description: string
}

export type OverviewHighlights = {
    progress: OverviewHighlight,
    partially_researched: OverviewHighlight,
    absolute: OverviewHighlight,
    not_researched: OverviewHighlight,
    easy: OverviewHighlight
}

export type ListofItems = {
    id: string,
    name: string | undefined,
    internalName: string | undefined,
    itemUrl: string | undefined,
    imageUrl: string | undefined,
    category: string | undefined,
    research: number | undefined,
}[]

export type ItemsProgress = {
    researched: string[],
    easy: string[],
}