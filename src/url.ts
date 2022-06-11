function isHyperTransferURL(path: string) {
  let url;

  try {
    url = new URL(path);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function querify(params: Record<string, any>) {
  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

  return Object.keys(params)
    .map((key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        throw new Error(
          `querify does not support array values, pass comma-separated-string instead`
        );
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join("&");
}

export { isHyperTransferURL, querify };
