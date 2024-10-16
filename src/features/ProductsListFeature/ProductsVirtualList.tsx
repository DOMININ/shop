'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import {
	ProductItemActions,
	ProductItemDataView,
	ProductsItem,
} from './ProductsItem/ProductsItem';
import { useInfinityScroll } from '@/shared/hooks/useInfinityScroll';
import { useFetchProductsNextPage } from './hooks/useFetchProductsNextPage';

type Props = ProductItemActions & {
	products: ProductItemDataView[];
};

// при скроле происходит много вызовов этого компонента
export const ProductsVirtualList = ({ products, ...rest }: Props) => {
	const { listRef, visibleItems, containerProps, wrapperProps } =
		useVirtualList<ProductItemDataView>(products, 200);
	const { fetchProductsNextPage } = useFetchProductsNextPage();
	console.log('ProductsVirtualList')

	// Подумать над тем, чтобы обернуть ProductsVirtualList еще одним компонентом в котором будет реализация подгрузки
	useInfinityScroll(listRef, () => {
		fetchProductsNextPage();
	});

	return (
		<div ref={listRef} className='h-[700px] overflow-y-auto'>
			<div {...containerProps}>
				<div
					{...wrapperProps}
					className='grid gap-2 grid-cols-1 justify-items-center'
				>
					{visibleItems.map(product => (
						<ProductsItem
							key={product.id}
							id={product.id}
							title={product.title}
							description={product.description}
							price={product.price}
							countInBasket={product.countInBasket}
							{...rest}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
