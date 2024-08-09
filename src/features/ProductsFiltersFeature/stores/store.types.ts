import { FilterType } from "../types";

type FilterId = string;
type PropertyId = number;

export interface ProductsFilters {
	id: FilterId;
	title: string;
	type: FilterType;
	properties: {
		id: PropertyId;
		title: string;
		type: string;
	}[];
}