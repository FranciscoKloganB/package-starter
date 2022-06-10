function toHumanReadableString(
  date: string | number,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

export { toHumanReadableString };
