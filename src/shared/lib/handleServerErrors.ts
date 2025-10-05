import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

interface ValidationErrorItem {
  field: string;
  message: string[];
}

export function handleServerErrors<T extends FieldValues>(
  errors: ValidationErrorItem[],
  setError: UseFormSetError<T>,
) {
  if (!Array.isArray(errors)) return;

  errors.forEach(({ field, message }) => {
    if (!field || !message?.length) return;

    const fieldPath = field as Path<T>;
    const errorMessage = message.join(', ');

    setError(fieldPath, { type: 'server', message: errorMessage });
  });
}
