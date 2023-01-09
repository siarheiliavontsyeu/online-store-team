import { capitalize, getMethodName, paginateArr, storage } from './helpers.utils';

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toEqual('Hello');
  });

  it('returns an empty string if passed an empty string', () => {
    expect(capitalize('')).toEqual('');
  });
});

describe('getMethodName', () => {
  it('returns the correct method name for a given event', () => {
    expect(getMethodName('click')).toEqual('onClick');
    expect(getMethodName('focus')).toEqual('onFocus');
    expect(getMethodName('submit')).toEqual('onSubmit');
  });
});

describe('paginateArr', () => {
  it('returns the correct subset of the array for a given page and limit', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(paginateArr(arr, 5, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(paginateArr(arr, 5, 2)).toEqual([6, 7, 8, 9, 10]);
    expect(paginateArr(arr, 5, 3)).toEqual([]);
  });

  it('returns an empty array if the page or limit is invalid', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(paginateArr(arr, 5, 0)).toEqual([]);
    expect(paginateArr(arr, 5, -1)).toEqual([]);
    expect(paginateArr(arr, 0, 1)).toEqual([]);
    expect(paginateArr(arr, -1, 1)).toEqual([]);
  });
});
