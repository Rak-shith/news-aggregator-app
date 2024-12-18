import axios from "axios";

const NEWS_API_KEY = "9fa0825f28c04cbf8705a0793c1a8c0a";

const NEWS_DATA_API_KEY = "pub_6260247100c546187bd0eaf0407c796014b21";

export const fetchNewsAPI = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=Apple&apiKey=${NEWS_API_KEY}`
  );
  console.log(res, "resppppppppp");
  
  const newsData = res.json();
  console.log(newsData, "newsData");
  
  return newsData.data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.urlToImage,
  }));
};

export const fetchGuardianAPI = async () => {
  const res = await axios.get(
    `https://newsdata.io/api/1/latest?apikey=${NEWS_DATA_API_KEY}&q=donald%20trump&region=washington-united%20states%20of%20america`
  );
  return res.data.response.results.map((article) => ({
    title: article.webTitle,
    description: "The Guardian article",
    url: article.webUrl,
    image: null,
  }));
};