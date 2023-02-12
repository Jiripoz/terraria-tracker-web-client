export type ItemData = {
	id: number;
	category: [];
	consumable: boolean;
	hardmode: boolean;
	imageUrl: string;
	imagefile: string;
	internalName: string;
	itemUrl: string;
	name: string;
	rare: number;
	research: number;
	tags: [];
	tooltip: string;
};

export type ItemDataResponse = Record<string, ItemData>;
