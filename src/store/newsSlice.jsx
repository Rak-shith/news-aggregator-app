import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsAPI } from "../service/newsAPI";
import { fetchMediaStackAPI } from "../service/newsCredAPI";
import { fetchNYTAPI } from "../service/openNewsAPI";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters, {getState, rejectWithValue }) => {
    try {
      const { searchText, date, category, source } = filters;

      const cacheKey = JSON.stringify(filters);

      const { news } = getState();
      if (news.cache[cacheKey]) {
        return { filters, articles: news.cache[cacheKey] };
      }

      let articles = [];

      if (source === "NewsAPI" || source === "all") { 
        const newAPIArticles = await fetchNewsAPI(searchText, date, category);
        articles = [...articles, ...newAPIArticles];
      }

      if (source === "MediaStack" || source === "all") {
        const guardianArticles = await fetchMediaStackAPI(
          searchText,
          date,
          category
        );
        articles = [...articles, ...guardianArticles];
      }

      if (source === "NYT" || source === "all") {
        const nyTimesArticles = await fetchNYTAPI(searchText, date, category);
        articles = [...articles, ...nyTimesArticles];
      }


      return { filters, articles };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    cache: {},
    filters: {
      searchText: "",
      date: "",
      category: "general",
      source: "all",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setAllFilters(state, action) {
      const { field, value } = action.payload;
      state.filters[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const { filters, articles } = action.payload;
        state.status = "succeeded";
        state.articles = articles;

        const cacheKey = JSON.stringify(filters);
        state.cache[cacheKey] = articles;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAllFilters } = newsSlice.actions;
export default newsSlice.reducer;
