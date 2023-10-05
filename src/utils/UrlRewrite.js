import { removeVietnameseAccent } from "./StringFormatter";

export const rewriteUrl = (str) => {
  let url = removeVietnameseAccent(str.toLowerCase());
  url = url.replaceAll("-", " ");
  url = url.replaceAll(/\s+/g, " ");
  url = url.toLowerCase().replaceAll(" ", "-");
  return url;
};

export const getIdInRewriteUrl = (rewriteUrl) => {
  return rewriteUrl.substr(rewriteUrl.lastIndexOf("-") + 1);
};
