function toHumanReadableString(date: string | number | Date, options?: Intl.DateTimeFormatOptions) {
  if (!date) {
    throw new TypeError(`'${date}' is not a valid date`);
  }

  const convertableDate = date instanceof Date ? date : new Date(date);
  const humanReadableDate = convertableDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });

  if (humanReadableDate === 'Invalid Date') {
    throw new Error(`'${date}' is not a valid date`);
  }

  return humanReadableDate;
}

export { toHumanReadableString };
