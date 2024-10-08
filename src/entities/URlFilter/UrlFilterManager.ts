import queryString from 'query-string';
import { UrlFilter } from './UrlFilter';

/**
 * Что умеет UrlFilterManager?
 *
 * 1. Обновлять url страницы, если изменились фильтры
 * 2. Обновлять стейт если изменились фильтры
 * 3. Знает о всех фильтрах, хранит их у себя
 *
 * 4. Но ничего не знает о каждом из фильтров, как работает, как парсится и тд
 */
export class UrlFilterManager {
	changeState;
	updateUrl;
	filters: UrlFilter[];
	// @ts-ignore
	constructor(changeState, changePage, filters) {
		this.changeState = changeState;
		this.updateUrl = changePage;
		this.filters = filters;
	}

	// @ts-ignore
	setFilter(filterName, value) {
		const filter = this.filters.find(f => f.name === filterName);

		if (!filter) {
			throw new Error('Нет такого фильтра');
		}

		filter.setValue(value);
		this.updateStore();
		this.updatePageUrl();
	}

	restoreFiltersFromUrl() {
		const parsedParams = queryString.parse(
			typeof window !== 'undefined' ? window.location.search : '',
			{
				arrayFormat: 'bracket',
				parseNumbers: false,
			}
		);

		this.filters.forEach(f => {
			if (f.name in parsedParams && parsedParams[f.name]) {
				// @ts-ignore
				f.setValueFromUrl(parsedParams[f.name]);
			}
		});
	}

	updateStore() {
		this.changeState(this.filters);
	}

	updatePageUrl() {
		const queryString = `?${this.filters
			.filter(f => f.hasValue())
			.map(f => f.urlValue)
			.join('&')}`;
		this.updateUrl(queryString);
	}
}
