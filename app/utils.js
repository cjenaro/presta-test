import { css as prestaCss } from "presta/extract";

export function bodyParams(reqBody) {
  return reqBody.split("&").reduce((acc, current) => {
    const [key, value] = current.split("=");
    acc[key] = value;
    return acc;
  }, {});
}

export function redirect(to, options) {
  const headers = options && options.headers ? options.headers : {};
  return {
    statusCode: 303,
    headers: {
      ...headers,
      Location: to,
    },
  };
}

export function isRedirect(object = {}) {
  return (
    object.statusCode && object.statusCode > 200 && object.statusCode < 400
  );
}

function interpolate(strings, interpolations) {
  return strings.reduce((final, str, i) => {
    return `${final}${str}${!!interpolations[i] ? interpolations[i] : ""}`;
  }, "");
}

/**
 * Named css for prettier formatter
 */
export function css(strings, ...interpolations) {
  const styleString = interpolate(strings, interpolations);
  const number = Math.random() * Number.MAX_SAFE_INTEGER;
  const sheetName = `sheet-${number.toString(36)}`;
  return prestaCss(styleString, sheetName);
}

export function extendChildrenLinks(links, object) {
  const childrenLinks = object && object.links ? object.links : [];
  return [...links, ...childrenLinks];
}

export function renderChildrenHTML(object) {
  return object && object.html ? object.html : "";
}
