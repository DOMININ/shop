import { Basket } from './Basket';
import { IBasket, IBasketProduct } from '../types';
import { BrowserStorage } from '@/entities/BrowserStorage/models/BrowserStorage';
import { ProductId } from '@/shared/types/product';

const BASKET_KEY = 'basket';

export class BasketManager {
	updateStore: (basket: IBasket) => void;
	basket: Basket;
	isPricesChanged: boolean;

	constructor(
		updateStore: (basket: IBasket) => void,
		defaultBasketState: IBasket
	) {
		this.updateStore = updateStore;
		this.basket = new Basket(defaultBasketState);
		this.isPricesChanged = false;
	}

	syncData() {
		this.handleUpdateStore();
		this.handleUpdateBrowserStorage();
	}

	handleUpdateStore() {
		this.updateStore(this.basket.obj);
	}

	updateBasket(
		products: IBasketProduct[],
		productsCount: Record<ProductId, number>
	) {
		this.basket.updateProducts(products);
		this.basket.updateProductsCount(productsCount);
		this.handleUpdateStore();
	}

	handleUpdateBrowserStorage() {
		// Лучше, чтобы класс принимал модель для работы с хранилищем, но не знал как обновлять это хранилище
		// Также как и со стором
		BrowserStorage.setItemLocalStorage(BASKET_KEY, JSON.stringify(this.basket));
	}

	updateProductsPrices(products: IBasketProduct[]) {
		const oldPrice = this.basket.totalPrice;
		const productsInBasketWithActualPrice = this.basket.products.map(
			product => {
				const productInBasket = products.find(p => p.id === product.id);

				if (
					productInBasket &&
					productInBasket.price.amount !== product.price.amount
				) {
					product.price.amount = productInBasket.price.amount;
					this.isPricesChanged = true;
				}

				return product;
			}
		);

		this.updateBasket(
			productsInBasketWithActualPrice,
			this.basket.productsCount
		);
		this.handleUpdateBrowserStorage();
		const newPrice = this.basket.totalPrice;
		if (newPrice !== oldPrice)
			this.isPricesChanged = true;
	}

	restoreBasketFromLocalStorage() {
		const basketFromLocalStorage =
			BrowserStorage.getItemLocalStorage(BASKET_KEY);

		if (basketFromLocalStorage) {
			const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);

			this.updateBasket(
				basketFromLocalStorageObj.products,
				basketFromLocalStorageObj.productsCount
			);
		}
	}

	handleAddItemToBasket(product: IBasketProduct) {
		this.basket.addItem(product);
		this.syncData();
	}

	handleRemoveItemFromBasket(product: IBasketProduct) {
		this.basket.removeItem(product);
		this.syncData();
	}

	handleClearBasket() {
		this.basket.clearProducts();
		this.syncData();
	}
}
