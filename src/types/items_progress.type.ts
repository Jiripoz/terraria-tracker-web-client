export type ItemProgress = {
	researched: number[];
	inProgress: {
		id: number;
		item_progress: number;
		easy: boolean;
	}[];
	notInProgress: {
		id: number;
		easy: boolean;
	}[];
};
