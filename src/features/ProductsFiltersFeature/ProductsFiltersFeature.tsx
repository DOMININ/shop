'use client';

import { useEffect, useState } from 'react';
import { LinkBackButton } from '../LinkBackButton/LinkBackButton';
import { useGetProductsFilters } from './hooks/useGetProductsFilters';

export const ProductsFiltersFeature = () => {
	const { filters, selectedFilters, saveFilters } = useGetProductsFilters();
	const [checkedFilters, setCheckedFilters] = useState<{
		[filterId: string]: number[];
	}>(selectedFilters);

	useEffect(() => {
		setCheckedFilters(selectedFilters);
	}, [selectedFilters]);

	// const handleCheckboxChange = (filterId: string, propertyId: number) => {
	// 	setCheckedFilters(prev => {
	// 		const currentFilterValues = prev[filterId] || [];
	// 		const isChecked = currentFilterValues.includes(propertyId);

	// 		const updatedFilters = {
	// 			...prev,
	// 			[filterId]: isChecked
	// 				? currentFilterValues.filter(id => id !== propertyId)
	// 				: [...currentFilterValues, propertyId],
	// 		};

	// 		if (!updatedFilters[filterId].length) {
	// 			delete updatedFilters[filterId];
	// 		}

	// 		return updatedFilters;
	// 	});
	// };

	return (
		<div>
			<LinkBackButton href='/' />

			{filters.map(filter => (
				<div key={filter.name}>
					<h3>{filter.name}</h3>
					{filter.availableValues.map(property => (
						<label key={property}>
							<input
								type='checkbox'
								value={property}
								checked={filter.isValueChecked(property)}
								// TODO Нужно обновлять стор
								onChange={() => filter.setValue(property)}
							/>
							{property}
						</label>
					))}
				</div>
			))}

			{/* {!!Object.keys(checkedFilters).length && (
				<button onClick={() => saveFilters(checkedFilters)}>Show</button>
			)} */}
		</div>
	);
};
