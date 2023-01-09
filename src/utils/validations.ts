export const validName = (s: string): boolean => {
  const regexp = /^\b\w{3,}\b( \b\w{3,}\b)+$/;
  return regexp.test(s);
};

export const validPhone = (s: string): boolean => {
  const regexp = /^\+\d{9,}$/;
  return regexp.test(s);
};

export const validEmail = (s: string): boolean => {
  const regexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regexp.test(s);
};

export const validCard = (s: string): boolean => {
  const regexp = /^\d{16}$/;
  return regexp.test(s);
};

export const validCardDate = (s: string): boolean => {
  const regexp = /^\d{2}\/\d{2}$/;
  if (!regexp.test(s)) {
    return false;
  }
  const month = parseInt(s.substring(0, 2), 10);
  return month > 0 && month <= 12;
};

export const validAddress = (s: string): boolean => {
  const regexp = /^\b\w{5,}\b \b\w{5,}\b \b\w{5,}\b( \b\w{5,}\b)+$/;
  return regexp.test(s);
};

export const validCVV = (s: string): boolean => {
  const regexp = /^\d{3}$/;
  return regexp.test(s);
};
