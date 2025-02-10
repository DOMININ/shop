'use client';

import React from 'react';
import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductsItem } from './ProductsItem/ProductsItem';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import {
  ProductItemActions,
  ProductItemDataView,
  ProductLoadActions,
} from '@/entities/Products/types';

type Props = ProductItemActions &
  ProductLoadActions & {
    products: ProductItemDataView[];
  };

export const ProductsVirtualList = ({
  products,
  fetchNextPage,
  hasNextPage,
  ...rest
}: Props) => {
  const { listRef, visibleItems, containerProps, wrapperProps } =
    useVirtualList<ProductItemDataView>(products, 70);

  useInfiniteScroll(listRef, () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div ref={listRef} className='h-[700px] overflow-y-auto'>
      <div {...containerProps}>
        <div {...wrapperProps} className='flex flex-wrap justify-center gap-4'>
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
