import type { Item } from './item.type';

export type Station = {
	id: number;
	name: string;
	imageUrl: string;
	craftables: number[];
};

export type Ingredient = {
	amount: number;
	id: number;
	name: string;
}[];

export type StationProgress = {
	progress: number;
	research: number;
	easy: boolean;
	special: boolean;
};
export type Craftable = Pick<Item, 'id' | 'name' | 'imageUrl' | 'research'> & {
	item_progress: number;
	easy: boolean;
};

export type StationDisplay = {
	id: number;
	name: string;
	imageUrl: string;
	easy: boolean;
};
