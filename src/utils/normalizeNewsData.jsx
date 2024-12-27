import noImage from "../assets/noImage.png";

export const normalizeNewsData = (data, source) => {
  return data.map(item => ({
    title: item?.title || item?.webTitle || item.headline?.main || item?.name || item.snippet,
    description: item?.description || item?.abstract || item?.lead_paragraph || "No description available",
    url: item?.url || item?.webUrl || item.web_url,
    image: item?.image || item?.urlToImage || item?.multimedia?.[0]?.url || noImage,
    published_at: item?.published_at || item?.webPublicationDate || item?.publishedAt || item?.pub_date || "No date available",
    source: source || item?.source || "Reuters",
    category: item?.category || item?.sectionName || "general",
    author: item?.author || item?.byline?.original || "John Doe",
  }));
};
