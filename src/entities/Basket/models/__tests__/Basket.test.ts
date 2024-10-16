import { Basket } from '../Basket';

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
const product2 = {
	id: 2,
	title: 'Oriental Cotton Chicken',
	description:
		'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
	price: {
		amount: 766.19,
		currency: 'USD',
	},
	categoryId: 0,
	availableCount: 2,
};

describe('Basket', () => {
	let basket: Basket;

	describe('should work correctly', () => {
		beforeEach(() => {
			basket = new Basket({
				products: [],
				productsCount: {},
			});
		});

		test('should add product correctly', () => {
			// one item
			basket.addItem(product);

			expect(basket.products).toHaveLength(1);
			expect(basket.productsCount).toStrictEqual({ '1': 1 });
			expect(basket.getProductsIds).toStrictEqual(['1']);
			expect(basket.totalPrice).toBe(438.95);
			expect(basket.getProductCountById(1)).toBe(1);
			expect(basket.getProductById(1)).toStrictEqual(product);
			expect(basket.canAdd(1)).toBeFalsy();
			expect(basket.canRemove(1)).toBeTruthy();
			expect(basket.obj).toStrictEqual({
				products: [product],
				productsCount: {
					'1': 1,
				},
			});

			// two items
			basket.addItem(product2);

			expect(basket.products).toHaveLength(2);
			expect(basket.productsCount).toStrictEqual({ '1': 1, '2': 1 });
			expect(basket.getProductsIds).toStrictEqual(['1', '2']);
			expect(basket.totalPrice).toBe(1205.14);
			expect(basket.getProductCountById(1)).toBe(1);
			expect(basket.getProductCountById(2)).toBe(1);
			expect(basket.getProductById(1)).toStrictEqual(product);
			expect(basket.getProductById(2)).toStrictEqual(product2);
			expect(basket.canAdd(1)).toBeFalsy();
			expect(basket.canAdd(2)).toBeTruthy();
			expect(basket.canRemove(1)).toBeTruthy();
			expect(basket.canRemove(2)).toBeTruthy();
			expect(basket.obj).toStrictEqual({
				products: [product, product2],
				productsCount: {
					'1': 1,
					'2': 1,
				},
			});
		});

		test('should remove item correctly', () => {
			basket.addItem(product);
			basket.addItem(product2);
			basket.removeItem(product);

			expect(basket.products).toHaveLength(1);
			expect(basket.productsCount).toStrictEqual({ '2': 1 });
			expect(basket.getProductsIds).toStrictEqual(['2']);
			expect(basket.totalPrice).toBe(766.19);
			expect(basket.getProductCountById(1)).toBe(0);
			expect(basket.getProductCountById(2)).toBe(1);
			expect(basket.getProductById(1)).toBeUndefined();
			expect(basket.getProductById(2)).toStrictEqual(product2);
			expect(basket.obj).toStrictEqual({
				products: [product2],
				productsCount: {
					'2': 1,
				},
			});
		});

		test('should clear basket correctly', () => {
			basket.addItem(product);
			basket.addItem(product2);
			basket.clearProducts();

			expect(basket.products).toHaveLength(0);
			expect(basket.productsCount).toStrictEqual({});
			expect(basket.getProductsIds).toStrictEqual([]);
			expect(basket.totalPrice).toBe(0);
			expect(basket.getProductCountById(1)).toBe(0);
			expect(basket.getProductCountById(2)).toBe(0);
			expect(basket.getProductById(1)).toBeUndefined();
			expect(basket.getProductById(2)).toBeUndefined();
			expect(basket.obj).toStrictEqual({
				products: [],
				productsCount: {},
			});
		});

		test('should update products and productsCount correclty', () => {
			basket.addItem(product);
			basket.updateProducts([product2]);
			basket.updateProductsCount({ '2': 2 });

			expect(basket.products).toHaveLength(1);
			expect(basket.productsCount).toStrictEqual({ '2': 2 });
			expect(basket.getProductsIds).toStrictEqual(['2']);
			expect(basket.totalPrice).toBe(1532.38);
			expect(basket.getProductById(2)).toStrictEqual(product2);
			expect(basket.getProductCountById(2)).toBe(2);
			expect(basket.obj).toStrictEqual({
				products: [product2],
				productsCount: {
					'2': 2,
				},
			});
		});
	});
});
