export const capitalize = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMethodName = (event: keyof GlobalEventHandlersEventMap) => {
  return `on${capitalize(event)}`;
};
