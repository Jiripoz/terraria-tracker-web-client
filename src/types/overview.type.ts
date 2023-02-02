export type OverviewHighlight = {
	big: string;
	small: string | undefined;
	description: string;
};

export type OverviewHighlights = {
	progress: OverviewHighlight;
	partially_researched: OverviewHighlight;
	absolute: OverviewHighlight;
	not_researched: OverviewHighlight;
	easy: OverviewHighlight;
};
