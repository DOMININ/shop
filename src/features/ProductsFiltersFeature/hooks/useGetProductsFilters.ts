import { useEffect } from 'react';
import { productsFiltersStore } from '../stores/productsFiltersStore';
import queryString from 'query-string';

export const useGetProductsFilters = () => {
	const isLoading = productsFiltersStore(state => state.isLoading);
	const filters = productsFiltersStore(state => state.filters);
	const selectedFilters = productsFiltersStore(state => state.selectedFilters);
	const saveFiltersToStore = productsFiltersStore(
		state => state.saveFiltersToStore
	);
	const getCategoriesAction = productsFiltersStore(
		state => state.getCategoriesAction
	);

	const saveFilters = (templateFilters: Record<string, number[]>) => {
		// save in the store
		saveFiltersToStore(templateFilters);

		// save in the url
		const filterUrlParams = `?${queryString.stringify(templateFilters, {
			arrayFormat: 'bracket',
		})}`;

		// использовать useRouter
		window.history.pushState(null, '', filterUrlParams);
	};

	const saveFiltersFromUrl = () => {
		const parsedParams = queryString.parse(location.search, {
			arrayFormat: 'bracket',
			parseNumbers: true,
		});

		saveFiltersToStore(parsedParams);
	};

	useEffect(() => {
		getCategoriesAction();
		saveFiltersFromUrl();
	}, [getCategoriesAction]);

	return {
		filters,
		selectedFilters,
		isLoading,
		saveFilters,
	};
};
