import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for Fetching News
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters,  { rejectWithValue, getState }) => {
    if (!filters.q) {
      return [];
    }
    const { news } = getState();
    if (news.filters === filters && news.articles.length > 0) {
      // Return cached data
      return news.articles;
    }
    try {
      const { q, sortBy, from, country, category } = filters;
      const baseUrl = "https://newsapi.org/v2/everything";
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      console.log("API URL:", apiKey);

      const queryParams = new URLSearchParams({
        ...(q && { q }),
        ...(sortBy && { sortBy }),
        ...(country && { country }),
        ...(category && { category }),
        ...(from && { from }),
        apiKey,
      });
      console.log("API queryParams:", queryParams);
      const response = await axios.get(`${baseUrl}?${queryParams.toString()}`);
      // const response = {
      //   articles: [
      //     {
      //       source: { id: "techcrunch", name: "TechCrunch" },
      //       author: "John Doe",
      //       title: "Tesla releases new model",
      //       description: "Tesla has launched a new electric vehicle model.",
      //       url: "https://techcrunch.com/tesla-new-model",
      //       urlToImage: "https://example.com/tesla-image.jpg",
      //       publishedAt: "2024-12-19T10:00:00Z",
      //       content: "Tesla has introduced a cutting-edge vehicle...",
      //     },
      //     {
      //       source: { id: "bbc", name: "BBC" },
      //       author: "Jane Doe",
      //       title: "Tesla shares surge",
      //       description: "Tesla's stock prices increased after new model launch.",
      //       url: "https://bbc.com/tesla-shares",
      //       urlToImage: "https://example.com/tesla-shares.jpg",
      //       publishedAt: "2024-12-19T09:00:00Z",
      //       content: "Tesla stock prices soared due to positive news...",
      //     },
      //   ],
      // };
      console.log("API RESPONSE URL:", `${baseUrl}?${queryParams.toString()}`);
      // console.log("API RESPONSE ALL:", response.articles);
      return response.data.articles;
      // return response.articles;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    filters: {
      q: "tesla",
      sortBy: "popularity",
      from: "2024-12-16",
      country: "",
      category: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
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
      });
  },
});

export const { setFilters } = newsSlice.actions;
export default newsSlice.reducer;

