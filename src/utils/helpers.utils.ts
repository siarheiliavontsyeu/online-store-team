export const capitalize = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMethodName = (event: keyof GlobalEventHandlersEventMap) => {
  return `on${capitalize(event)}`;
};

export const paginateArr = <T>(arr: T[], limit: number, page: number) => {
  return arr.slice((page - 1) * limit, page * limit);
};
