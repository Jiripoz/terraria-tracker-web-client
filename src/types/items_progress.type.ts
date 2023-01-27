export type Partially_Researched = {
    name: string,
    item_progress: number,
    research_needed: number,
    progress: number,
}
export type ItemsProgress = {
    researched: number[],
    easy: number[],
    partially_researched: Partially_Researched[],
}