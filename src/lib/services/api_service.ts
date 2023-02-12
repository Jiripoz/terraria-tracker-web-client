import type { OverviewHighlights } from 'src/types/overview.type';
import type { ServerConfig } from 'src/types/server_config.type';
import type { ItemDataResponse } from 'src/types/item_data.type';
import type { ItemProgress } from 'src/types/items_progress.type';
import type { Station } from 'src/types/stations.type';

const ROOT_URL = 'http://localhost';
const PORT = 4777;

export const fetchOverview = async (): Promise<OverviewHighlights> => {
	return fetch(`${ROOT_URL}:${PORT}/overview`)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log(error);
			return undefined;
		});
};

export const fetchConfig = async (): Promise<ServerConfig> => {
	return fetch(`${ROOT_URL}:${PORT}/config`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return {};
		});
};

export const fetchItems = async (): Promise<ItemDataResponse> => {
	return fetch(`${ROOT_URL}:${PORT}/items`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return {};
		});
};

export const fetchItemsProgress = async (): Promise<ItemProgress> => {
	return fetch(`${ROOT_URL}:${PORT}/items-progress`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return {};
		});
};

export const fetchStations = async (): Promise<Station[]> => {
	return fetch(`${ROOT_URL}:${PORT}/stations`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);
			return {};
		});
};
