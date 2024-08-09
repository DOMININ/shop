import { ApiService } from '@/shared/api/apiService';
import { APIProductsFilters } from './productsFiltersApiService.types';
import { FilterType } from '../types';

const PRODUCTS_FILTERS_URL_API = '';

export const FILTER_TYPE_SEPARATOR_MAPPER: Record<FilterType, string> = {
	'range': '.',
	'list': '_'
}

class ProductsFiltersApiService extends ApiService {
	// TODO: mock data
	public async getProductsFilters(): Promise<APIProductsFilters[]> {
		return [
			{
				id: 'categories',
				title: 'Категории',
				type: 'list',
				properties: [
					{ id: 1, title: 'Электроника', type: 'checkbox' },
					{ id: 2, title: 'Одежда', type: 'checkbox' },
					{ id: 3, title: 'Книги', type: 'checkbox' },
				],
			},
			{
				id: 'deliveryDate',
				title: 'Даты доставки',
				type: 'list',
				properties: [
					{ id: 1, title: '02.03', type: 'checkbox' },
					{ id: 2, title: '03.03', type: 'checkbox' },
					{ id: 3, title: '05.03', type: 'checkbox' },
				],
			},
			{
				id: 'price',
				title: 'Цена',
				type: 'range',
				properties: [],
			},
			{
				id: 'brend',
				title: 'Бренд',
				type: 'list',
				properties: [
					{ id: 1, title: 'Apple', type: 'checkbox' },
					{ id: 2, title: 'Samsung', type: 'checkbox' },
					{ id: 3, title: 'Nike', type: 'checkbox' },
				],
			},
			{
				id: 'color',
				title: 'Цвет',
				type: 'list',
				properties: [
					{ id: 1, title: 'Красный', type: 'checkbox' },
					{ id: 2, title: 'Синий', type: 'checkbox' },
					{ id: 3, title: 'Зеленый', type: 'checkbox' },
				],
			},
		];

		// return super.get({ path: 'categories' });
	}
}

export const productsFiltersApiService = new ProductsFiltersApiService(
	PRODUCTS_FILTERS_URL_API
);
