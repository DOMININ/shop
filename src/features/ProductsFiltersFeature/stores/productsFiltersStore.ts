import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { FILTER_TYPE_SEPARATOR_MAPPER, productsFiltersApiService } from '../services/productsFiltersApiService';
import { productsFiltersMapping } from './mapping/productsFiltersMapping';
import { UrlFilter } from '@/entities/URlFilter/UrlFilter';

interface ProductsFiltersState {
	filters: UrlFilter[];
	selectedFilters: Record<string, number[]>;
	isLoading: boolean;

	saveFiltersToStore: (filters: Record<string, number[]>) => void;
	getCategoriesAction: () => void;
}

export const productsFiltersStore = create<ProductsFiltersState>(set => ({
	filters: [],
	selectedFilters: {},
	isLoading: false,

	saveFiltersToStore: (filters: Record<string, number[]>) => {
		set({ selectedFilters: filters });
	},

	getCategoriesAction: () => {
		set({ isLoading: true });
		productsFiltersApiService
			.getProductsFilters()
			.then(resp => {
				const mappedFilters = productsFiltersMapping(resp);

				const urlFilters = mappedFilters.map(f => new UrlFilter(f.id, f.properties.map(p => p.title), [], FILTER_TYPE_SEPARATOR_MAPPER[f.type]));

				set({ filters: urlFilters });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching categories');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
