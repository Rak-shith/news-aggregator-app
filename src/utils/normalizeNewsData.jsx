import noImage from "../assets/noImage.png";

export const normalizeNewsData = (data, source) => {
  return data.map(item => ({
    title: item?.title || item?.webTitle || item.headline?.main || item?.name || item.snippet,
    description: item?.description || item.fields?.trailText || item?.abstract || item?.lead_paragraph || "No description available",
    url: item?.url || item?.webUrl || item.web_url,
    image: item?.image || item?.urlToImage || noImage,
    published_at: item?.published_at || item?.webPublicationDate || item?.publishedAt || item?.pub_date || "No date available",
    source: item?.source || item?.source?.name || item?.fields?.publication || 'all',
    category: item?.category || item?.sectionName || "General",
    author: item?.author || item?.byline?.original || item?.fields?.byline || 'No Author',
  }));
};
