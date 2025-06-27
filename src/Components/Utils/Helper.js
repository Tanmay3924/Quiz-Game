// Shuffle options randomly
export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Decode HTML entities from the API (like &quot; to ")
export const decodeHtml = (html) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(html, "text/html").documentElement
    .textContent;
  return decoded;
}; //aaa
