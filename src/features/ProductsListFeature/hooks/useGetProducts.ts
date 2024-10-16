import { useCallback, useEffect, useMemo } from 'react';
import { productsStore } from '../stores/productsStore';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { ProductItemDataView } from '../ProductsItem/ProductsItem';
import { ProductId } from '@/shared/types/product';

/**
 * 
 * Сделать универсальный хук получения списка продуктов который будет тут использоваться
 * /entity/product/hooks
 * const { products, fetchMore, isLoading, isError } = useGetProducts();
 * 1. Умеет загружать продукты через reactQuery
 * 2. Есть метод пагинации fetchMore
 * 3. Хранит стейт продукта и постоянно его обновляет
 */
export const useGetProducts = () => {
	const status = productsStore(state => state.status);
	const productsList = productsStore(state => state.products);
	const findProductById = productsStore(state => state.findById);

	const getProductsAction = productsStore(state => state.getProductsAction);
	const { basketManager } = useGetBasketManager();

	useEffect(() => {
		getProductsAction();
	}, []);

	const products: ProductItemDataView[] = useMemo(() => {
		if (productsList.length) {
			return productsList.map(item => ({
				description: item.description,
				title: item.title,
				price: item.price,
				id: item.id,
				countInBasket: basketManager.basket.getProductCountById(item.id),
			}));
		}

		return [];
	}, [productsList, basketManager]);

	const handleAddToBasket = useCallback(
		(id: ProductId) => {
			const product = findProductById(id);
			if (!!product) basketManager.handleAddItemToBasket(product);
		},
		[basketManager, findProductById]
	);

	const handleRemoveFromBasket = useCallback(
		(id: ProductId) => {
			const product = findProductById(id);
			if (!!product) basketManager.handleRemoveItemFromBasket(product);
		},
		[basketManager, findProductById]
	);

	return {
		products,
		status,
		canAdd: basketManager.basket.canAdd,
		canRemove: basketManager.basket.canRemove,
		handleRemoveFromBasket,
		handleAddToBasket,
	};
};
