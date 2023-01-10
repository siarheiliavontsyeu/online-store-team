export const capitalize = (str: string) => {
  if (str.length > 0) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
  return '';
};

export const getMethodName = (event: keyof GlobalEventHandlersEventMap) => {
  return `on${capitalize(event)}`;
};

export const paginateArr = <T>(arr: T[], limit: number, page: number) => {
  if (page > 0 && limit > 0) {
    return arr.slice((page - 1) * limit, page * limit);
  }
  return [];
};

export const storage = <T>(key: string, data?: T) => {
  if (data === undefined) {
    try {
      const item = localStorage.getItem(key);
      return item && (JSON.parse(item) as T);
    } catch (error) {
      return null;
    }
  }
  if (data === null) {
    localStorage.removeItem(key);
    return true;
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};
