export class LocalStorageHelper {
  static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ошибка игнорируется
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ошибка игнорируется
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch {
      // Ошибка игнорируется
    }
  }
}
