import { path } from 'ramda';
import { checkNumberField } from '@/shared/mapping/validation/checkNumberField';
import { checkStringField } from '@/shared/mapping/validation/checkStringField';
import { APIProductsFilters } from '../../services/productsFiltersApiService.types';
import { ProductsFilters } from '../store.types';

const propertiesMapping = (
	properties: APIProductsFilters['properties']
): ProductsFilters['properties'] => {
	if (!Array.isArray(properties)) {
		return [];
	}

	return properties.map(i => ({
		id: checkNumberField(path(['id'], i)),
		title: checkStringField(path(['title'], i)),
		type: checkStringField(path(['type'], i)),
	}));
};

export const productsFiltersMapping = (
	filters: APIProductsFilters[]
): ProductsFilters[] => {
	if (!Array.isArray(filters)) {
		return [];
	}

	return filters.map(i => {
		return {
			...i,
			id: checkStringField(path(['id'], i)),
			title: checkStringField(path(['title'], i)),
			properties: propertiesMapping(path(['properties'], i)),
		};
	});
};
