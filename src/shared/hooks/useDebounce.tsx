import { useEffect, useState } from 'react';

/**
 * Хук для задержки (debounce) значения
 * @param value исходное значение (любого типа)
 * @param delay время задержки в миллисекундах (по умолчанию 500)
 * @returns debouncedValue — значение, обновляемое только после задержки
 */

export const useDebounce = <T,>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
