import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsAPI, fetchSourceAPI } from "../service/newsAPI";
import { fetchMediaStackAPI } from "../service/newsCredAPI";
import { fetchNYTAPI } from "../service/openNewsAPI";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ searchText, date }, { rejectWithValue }) => {
    try {
      const articles = await fetchNewsAPI(searchText, date);
      return articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSourceNews = createAsyncThunk(
  "news/fetchSourceNews",
  async ({ category }, { rejectWithValue }) => {
    try {
      const  categoryList = await fetchSourceAPI(category);
      return categoryList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMediaStackNews = createAsyncThunk(
  "news/fetchMediaStackNews",
  async (searchText, { rejectWithValue }) => {
    try {
      const mediaStackArticles = await fetchMediaStackAPI(searchText);
      return mediaStackArticles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNYTNews = createAsyncThunk(
  "news/fetchNYTNews",
  async (searchText, { rejectWithValue }) => {
    try {
      const nytArticles = await fetchNYTAPI(searchText);
      return nytArticles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    categoryList: [],
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

      .addCase(fetchSourceNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSourceNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryList = action.payload;
      })
      .addCase(fetchSourceNews.rejected, (state, action) => {
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
