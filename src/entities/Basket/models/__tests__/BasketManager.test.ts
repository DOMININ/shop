import { IBasket } from '../../types';
import { BasketManager } from '../BasketManager';
// TODO: Сделать отдельную папку __tests__
const product = {
	id: 1,
	title: 'Elegant Wooden Car',
	description:
		'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
	price: {
		amount: 438.95,
		currency: 'USD',
	},
	categoryId: 0,
	availableCount: 1,
};
const productWithNewPrice = {
	id: 1,
	title: 'Elegant Wooden Car',
	description:
		'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
	price: {
		amount: 843.59,
		currency: 'USD',
	},
	categoryId: 0,
	availableCount: 1,
};

describe('BasketManager', () => {
	let updateStoreMock: (basket: IBasket) => void;
	let defaultBasketState: IBasket;
	let basketManager: BasketManager;

	describe('should work correctly', () => {
		beforeEach(() => {
			updateStoreMock = vi.fn();
			defaultBasketState = {
				products: [],
				productsCount: {},
			};
			basketManager = new BasketManager(updateStoreMock, defaultBasketState);
		});

		test('should add item to basket and sync data', () => {
			basketManager.handleAddItemToBasket(product);

			const dataForProduct = {
				products: [product],
				productsCount: {
					'1': 1,
				},
			};

			expect(basketManager.basket.obj).toStrictEqual(dataForProduct);
			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual(
				dataForProduct
			);
			expect(updateStoreMock).toHaveBeenCalled();
		});

		test('should remove item from basket and sync data', () => {
			basketManager.handleAddItemToBasket(product);
			basketManager.handleRemoveItemFromBasket(product);

			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual({
				products: [],
				productsCount: {},
			});
			expect(updateStoreMock).toHaveBeenCalled();
		});

		test('should clear basket and sync data', () => {
			basketManager.handleAddItemToBasket(product);
			basketManager.handleClearBasket();

			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual({
				products: [],
				productsCount: {},
			});
			expect(updateStoreMock).toHaveBeenCalled();
		});

		test('should restore basket from localStorage', () => {
			const dataForProduct = {
				products: [product],
				productsCount: {
					'1': 1,
				},
			};

			localStorage.setItem('basket', JSON.stringify(dataForProduct));

			basketManager.restoreBasketFromLocalStorage();

			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual(
				dataForProduct
			);
			expect(updateStoreMock).toHaveBeenCalled();
		});

		test('should update product with new price', () => {
			basketManager.handleAddItemToBasket(product);

			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual({
				products: [product],
				productsCount: { '1': 1 },
			});
			expect(updateStoreMock).toHaveBeenCalled();

			basketManager.updateProductsPrices([productWithNewPrice]);

			expect(JSON.parse(localStorage.getItem('basket')!)).toStrictEqual({
				products: [productWithNewPrice],
				productsCount: { '1': 1 },
			});
			expect(updateStoreMock).toHaveBeenCalled();
		});
	});
});
