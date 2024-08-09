import { FilterType } from "../types";

export interface APIProductsFilters {
	id: string;
	title: string;
	type: FilterType;
	properties: {
		id: number;
		title: string;
		type: 'checkbox' | 'range';
	}[];
}
