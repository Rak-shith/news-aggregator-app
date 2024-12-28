import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsAPI, fetchSourceAPI } from "../service/newsAPI";
import { fetchMediaStackAPI } from "../service/newsCredAPI";
import { fetchNYTAPI } from "../service/openNewsAPI";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters, { rejectWithValue }) => {
    try {
      const { searchText, date, category, source } = filters;

      let articles = [];

      if (source === "NewsAPI" || source === "all") {
        const newAPIArticles = await fetchNewsAPI(searchText, date);
        articles = [...articles, ...newAPIArticles];
      }

      // if (source === "MediaStack" || source === "all") {
      //   const guardianArticles = await fetchMediaStackAPI(
      //     searchText,
      //     date,
      //     category
      //   );
      //   articles = [...articles, ...guardianArticles];
      // }

      if (source === "NYT" || source === "all") {
        const nyTimesArticles = await fetchNYTAPI(searchText, date, category);
        articles = [...articles, ...nyTimesArticles];
      }

      if (category) {
        const newAPIArticlesSource = await fetchSourceAPI(category);
        articles = [...articles, ...newAPIArticlesSource];
      }

      return articles.map((article) => ({ ...article }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
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
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAllFilters } = newsSlice.actions;
export default newsSlice.reducer;
