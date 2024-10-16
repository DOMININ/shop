import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { productMapping } from './mapping/productsMapping';
import { ProductType } from '../types';
import { ProductId } from '@/shared/types/product';

interface ProductsState {
	products: ProductType[];
	status: 'idle' | 'loading' | 'loaded' | 'error';
	page: number;
	limit: number;
	totalCount: number;

	findById: (id: ProductId) => ProductType | undefined;
	getProductsAction: () => void;
	getProductsNextPageAction: () => void;
}

// TODO: Возможно стор будет не нужен
export const productsStore = create<ProductsState>((set, get) => ({
	products: [],
	status: 'idle',
	page: 1,
	limit: 100,
	totalCount: 0,

	findById: (id: ProductId) => {
		return get().products.find(p => p.id === id);
	},

	getProductsAction: () => {
		const { page, limit } = get();

		set({ status: 'loading' });

		productsApiService
			.getProducts(page, limit)
			.then(resp => {
				const mappedProducts = productMapping(resp?.products);

				set({ products: mappedProducts, totalCount: resp.total });
			})
			.catch(error => {
				set({ status: 'error' });
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ status: 'loaded' }));
	},

	// Заменить получение списка продуктов на из стора на RTK ReactQuery
	getProductsNextPageAction: () => {
		const { page, limit, products } = get();

		set(state => ({ page: state.page + 1 }));

		productsApiService
			.getProducts(page + 1, limit)
			.then(resp => {
				const mappedProducts = productMapping(resp?.products);

				set({ products: [...products, ...mappedProducts] });
			})
			.catch(error => {
				throw new APIProcessableError(
					error,
					'Error fetching the next products page'
				);
			});
	},
}));
