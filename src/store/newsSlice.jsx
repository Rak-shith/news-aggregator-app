import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noImage from "../assets/noImage.png";
import axios from "axios";

const normalizeNewsData = (data, source) => {
  return data.map(item => ({
    title: item.title || item.headline?.main || item.snippet,
    description: item.description || item?.abstract || item.lead_paragraph || "No description available",
    url: item.url || item.web_url,
    image: item.image || item?.urlToImage || item.multimedia?.[0]?.url || noImage, // Adjust this based on available fields
    published_at: item?.published_at || item?.publishedAt || item.pub_date || "No date available",
    source: source,
    category: item.category || "general"
  }));
};

// Async Thunk for Fetching News
// export const fetchNews = createAsyncThunk(
//   "news/fetchNews",
//   async (filters,  { rejectWithValue, getState }) => {
//     if (!filters.q) {
//       return [];
//     }
//     const { news } = getState();
//     if (news.filters === filters && news.articles.length > 0) {
//       // Return cached data
//       return news.articles;
//     }
//     try {
//       const { q, sortBy, from, country, category } = filters;
//       const baseUrl = "https://newsapi.org/v2/everything";
//       const apiKey = import.meta.env.VITE_NEWS_API_KEY;
//       console.log("API URL:", apiKey);

//       const queryParams = new URLSearchParams({
//         ...(q && { q }),
//         ...(sortBy && { sortBy }),
//         ...(country && { country }),
//         ...(category && { category }),
//         ...(from && { from }),
//         apiKey,
//       });
//       console.log("API queryParams:", queryParams);
//       // const response = await axios.get(`${baseUrl}?${queryParams.toString()}`, { timeout: 5000 });
//       // const response = {
//       //   articles: [
//       //     {
//       //       source: { id: "techcrunch", name: "TechCrunch" },
//       //       author: "John Doe",
//       //       title: "Tesla releases new model",
//       //       description: "Tesla has launched a new electric vehicle model.",
//       //       url: "https://techcrunch.com/tesla-new-model",
//       //       urlToImage: "https://example.com/tesla-image.jpg",
//       //       publishedAt: "2024-12-19T10:00:00Z",
//       //       content: "Tesla has introduced a cutting-edge vehicle...",
//       //     },
//       //     {
//       //       source: { id: "bbc", name: "BBC" },
//       //       author: "Jane Doe",
//       //       title: "Tesla shares surge",
//       //       description: "Tesla's stock prices increased after new model launch.",
//       //       url: "https://bbc.com/tesla-shares",
//       //       urlToImage: "https://example.com/tesla-shares.jpg",
//       //       publishedAt: "2024-12-19T09:00:00Z",
//       //       content: "Tesla stock prices soared due to positive news...",
//       //     },
//       //   ],
//       // };
//       if (response.status !== 200) {
//         throw new Error("API Error");
//       }
//       console.log("API RESPONSE URL:", `${baseUrl}?${queryParams.toString()}`);
//       return normalizeNewsData(response.data.articles, "NewsAPI");
//       // return response.data.articles;
//       // return response.articles;
//     } catch (error) {
//       return rejectWithValue(error.response.data || error.message);
//     }
//   }
// );

// Fetch News API (Existing)
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({searchText, date}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchText}&from=${date}&sortBy=publishedAt`, { 
        params: { 
          apiKey: import.meta.env.VITE_NEWS_API_KEY 
        }
      });
      console.log("normalizeNewsDataNewsAPIdata", normalizeNewsData(response.data.articles, "NewsAPI"));
      return normalizeNewsData(response.data.articles, "NewsAPI");
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch MediaStack News API
export const fetchMediaStackNews = createAsyncThunk(
  "news/fetchMediaStackNews",
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.mediastack.com/v1/news`, {
        params: {
          access_key: import.meta.env.VITE_MEDIASTACK_API_KEY,
          keywords: searchText,
          countries: "in,us,gb"
        }
      });
      console.log("normalizMediaStackAPIdata", normalizeNewsData(response.data.data, "MediaStack"));
      return normalizeNewsData(response.data.data, "MediaStack");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch NYT News API
export const fetchNYTNews = createAsyncThunk(
  "news/fetchNYTNews",
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}`, {
        params: { "api-key": import.meta.env.VITE_NYT_API_KEY }
      });
      // return normalizeNewsData(response.data.results, "NYT");
      console.log("normalizNYTAPIdata", normalizeNewsData(response.data.response.docs, "NYT"));
      return normalizeNewsData(response.data.response.docs, "NYT");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

console.log("fetchNewsssssssssssss", fetchNews,);
console.log("fetchMediaStackNewssssssssssssss", fetchMediaStackNews);
console.log("fetchNYTNewsssssssss", fetchNYTNews);


const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    mediaStackArticles: [],
    nytArticles: [],
    filters: {
      q: "tesla",
      sortBy: "popularity",
      from: "2024-12-16",
      country: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      .addCase(fetchMediaStackNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMediaStackNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mediaStackArticles = action.payload;
      })
      .addCase(fetchMediaStackNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      .addCase(fetchNYTNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNYTNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nytArticles = action.payload;
      })
      .addCase(fetchNYTNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters } = newsSlice.actions;
export default newsSlice.reducer;

