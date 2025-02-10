import { useInfiniteQuery } from '@tanstack/react-query';
import { productMapping } from '../mapping/productsMapping';
import { productsApiService } from '../services/productsApiService';
import { ProductType } from '../types';

interface Props {
  ssrProducts: ProductType[];
}

export const useGetProducts = ({ ssrProducts }: Props) => {
  const isHaveSsrData = ssrProducts.length;
  const limit = 100;
  console.log('ssrProducts',ssrProducts)

  const {
    data = [],
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['productsFirstPage'],
    queryFn: ({ pageParam }) =>
      productsApiService.getProducts(pageParam, limit),
    initialPageParam: isHaveSsrData ? 2 : 1,
    getNextPageParam: lastPage => {
      const hasMore = limit * lastPage.page < lastPage.total;

      return hasMore ? lastPage.page + 1 : null;
    },
    initialData: isHaveSsrData ? {
      pages: [
        {
          page: 1,
          products: [...ssrProducts],
          total: 1000,
        }
      ],
      pageParams: [1],
    } : undefined,
    select: data => data.pages.flatMap(page => productMapping(page.products)),
    enabled: !isHaveSsrData,
  });

  return {
    productsList: isHaveSsrData ? [...ssrProducts] : data,
    status,
    fetchNextPage,
    hasNextPage,
  };
};
