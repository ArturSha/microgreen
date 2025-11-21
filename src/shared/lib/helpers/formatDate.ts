export const formatDate = (date: Date | null) => {
  if (!date) return '';
  return date.toLocaleDateString('ru-RU');
};
