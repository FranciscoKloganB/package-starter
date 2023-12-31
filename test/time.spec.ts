import { toHumanReadableString } from '@src';

describe('toHumanReadableString', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('converts unix timestamp to human readable date', () => {
    expect(toHumanReadableString(1622374200)).toEqual('January 19, 1970');
  });

  it('converts date objects to human readable date', () => {
    // JavaScript counts months from 0 to 11
    const date = new Date(1991, 1, 14);
    expect(toHumanReadableString(date)).toEqual('February 14, 1991');
  });

  const usualDate = 'May 30, 2021';
  const validCases = [
    { date: '2021', expected: 'January 1, 2021' },
    { date: '2021-05-30', expected: usualDate },
    { date: 'Mon, 30 May 2021 17:28:32 GMT', expected: usualDate },
    { date: '2021-05-30T17:29:24.603Z', expected: usualDate },
  ];

  test.each(validCases)(
    'toHumanReadableString($date) should be $expected',
    ({ date, expected }) => {
      expect(toHumanReadableString(date)).toEqual(expected);
    },
  );

  const expectedErrorMessage = (s: string) => `'${s}' is not a valid date`;
  const invalidCases = [
    { date: '05-2021', error: Error(expectedErrorMessage('05-2021')) },
    { date: 'hello-world', error: Error(expectedErrorMessage('hello-world')) },
    { date: '', error: TypeError },
    { date: null, error: TypeError },
    { date: undefined as any, error: TypeError },
  ];
  test.each(invalidCases)(
    'toHumanReadableString($date) should be raise an error of $error',
    ({ date, error }) => {
      expect(() => toHumanReadableString(date)).toThrow(error);
    },
  );
});

describe('toHumanReadableString configuration object', () => {
  const fixedDated = '2021';
  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  let toLocaleDateStringSpy: jest.SpyInstance<
    string,
    [locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions]
  >;

  beforeEach(() => {
    toLocaleDateStringSpy = jest
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('January 1, 2021');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('defaults for day, month and year are numeric, long and numeric', () => {
    toHumanReadableString(fixedDated);

    expect(toLocaleDateStringSpy).toHaveBeenCalledWith('en-US', defaultOptions);
  });

  test('can configure day format', () => {
    const day = '2-digit';

    toHumanReadableString(fixedDated, { day });

    expect(toLocaleDateStringSpy).toHaveBeenCalledWith('en-US', {
      ...defaultOptions,
      day,
    });
  });

  test('can configure month format', () => {
    const month = 'short';

    toHumanReadableString(fixedDated, { month });

    expect(toLocaleDateStringSpy).toHaveBeenCalledWith('en-US', {
      ...defaultOptions,
      month,
    });
  });

  test('can configure year format', () => {
    const year = '2-digit';

    toHumanReadableString(fixedDated, { year });

    expect(toLocaleDateStringSpy).toHaveBeenCalledWith('en-US', {
      ...defaultOptions,
      year,
    });
  });

  test('can pass aditional configurations', () => {
    const localeMatcher = 'best fit';

    toHumanReadableString(fixedDated, { localeMatcher });

    expect(toLocaleDateStringSpy).toHaveBeenCalledWith('en-US', {
      ...defaultOptions,
      localeMatcher,
    });
  });
});
