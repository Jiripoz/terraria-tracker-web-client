import type { ItemData } from './item_data.type';

export type Item = ItemData & { item_progress: number; easy: boolean };
