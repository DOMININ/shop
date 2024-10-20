'use client';

import React from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { BasketCard } from './BasketCard';
import { useGetMainPageProductsList } from '../ProductsListFeature/hooks/useGetMainPageProductsList';

export const BasketListFeature = () => {
	const { basketManager } = useGetBasketManager();
	useGetMainPageProductsList();

	if (!basketManager.basket.getProductsIds.length) {
		return <div className='text-center text-lg font-bold'>Basket is empty</div>;
	}

	return (
		<section>
			<div className='grid gap-2 grid-cols-1 justify-items-center'>
				{basketManager.basket.products.map(product => (
					<BasketCard
						key={product.id}
						title={product.title}
						description={product.description}
						price={product.price.amount}
						countInBasket={basketManager.basket.getProductCountById(product.id)}
					/>
				))}
			</div>

			<button
				className='flex bg-red-500 hover:bg-red-700 text-white font-bold mt-4 py-2 px-4 rounded mx-auto'
				onClick={() => basketManager.handleClearBasket()}
			>
				Clear basket
			</button>
		</section>
	);
};
