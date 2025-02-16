import DOMPurify from "dompurify";

export const truncateMessage = (htmlString, wordLimit = 22) => {
  if (!htmlString) return "";

  // Sanitize the HTML first
  const cleanHTML = DOMPurify.sanitize(htmlString);

  // Convert sanitized HTML to plain text
  const tempElement = document.createElement("div");
  tempElement.innerHTML = cleanHTML;
  const text = tempElement.textContent || tempElement.innerText || "";

  // Split into words and limit to `wordLimit`
  const words = text.split(/\s+/).slice(0, wordLimit).join(" ");

  return words + (text.split(/\s+/).length > wordLimit ? "..." : "");
};
