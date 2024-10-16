'use client';

import { productsStore } from '@/features/ProductsListFeature/stores/productsStore';
import { BasketManager } from '../models/BasketManager';
import { basketStore } from '../store/basketStore';
import { useEffect } from 'react';
import { useToast } from '@/shared/hooks/useToast';

export const useGetBasketManager = () => {
	// basket
	// const { toast } = useToast();
	const basketState = basketStore().getBasketState();
	const updateBasketState = basketStore().updateBasketState;

	// products
	const productsList = productsStore(state => state.products);
	const getProductsAction = productsStore(state => state.getProductsAction);

	// const basketManager = new BasketManager(updateBasketState, toast, basketState);
	const basketManager = new BasketManager(updateBasketState, basketState);

	useEffect(() => {
		getProductsAction();
	}, []);

	useEffect(() => {
		if (productsList.length) {
			basketManager.updateProductsPrices(productsList);
		}
	}, [productsList]);

	return {
		basketManager,
	};
};
