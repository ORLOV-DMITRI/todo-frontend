/**
 * Функция склонения русских слов в зависимости от числа
 * @param count - количество
 * @param forms - массив форм слова [1, 2, 5] (например: ['заметка', 'заметки', 'заметок'])
 * @returns правильную форму слова
 */
export const pluralize = (count: number, forms: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)];
  return forms[index];
};

/**
 * Готовые формы для заметок
 */
export const notesForms: [string, string, string] = ['заметку', 'заметки', 'заметок'];

/**
 * Готовые формы для задач
 */
export const tasksForms: [string, string, string] = ['задачу', 'задачи', 'задач'];

/**
 * Функция для формирования полного текста с количеством и склонением
 * @param count - количество
 * @param forms - формы слова
 * @returns строку вида "5 заметок", "1 заметку", "2 заметки"
 */
export const formatCount = (count: number, forms: [string, string, string]): string => {
  return `${count} ${pluralize(count, forms)}`;
};

/**
 * Готовые функции для заметок и задач
 */
export const formatNotesCount = (count: number): string => formatCount(count, notesForms);
export const formatTasksCount = (count: number): string => formatCount(count, tasksForms);