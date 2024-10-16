// Перенести в shared

// interface BrowserStorage {
// 	get: () => void;
// 	set: () => void;
// 	delete: () => void;
// }

// class LocalStorage implements BrowserStorage {
	
// }
// class SessionStorage implements BrowserStorage {

// }

export class BrowserStorage {
	// Тут можно тоже сделать более абстрактно set и get
	static getItemLocalStorage(key: string) {
		return localStorage.getItem(key);
	}

	static setItemLocalStorage(key: string, value: string) {
		return localStorage.setItem(key, value);
	}
}
