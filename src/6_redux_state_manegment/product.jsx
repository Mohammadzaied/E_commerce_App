/* eslint-disable no-lone-blocks */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://localhost:7213/api";

const initialState = {
  updateResult: {
    data: null,
    status: "idle",
  },
  home: {
    data: [], //localStorage.getItem("isAuthenticated") != null ? localStorage.getItem("isAuthenticated") : false,
    status: "idle",
    error: null,
    hasMore: false,
  },
  watches: {
    data: [], //localStorage.getItem("isAuthenticated") != null ? localStorage.getItem("isAuthenticated") : false,
    status: "idle",
    error: null,
    hasMore: false,
  },
  mobiles: {
    data: [],
    status: "idle",
    error: null,
    hasMore: false,
  },
  clothes: {
    data: [],
    status: "idle",
    error: null,
    hasMore: false,
  },
  searchResults: [],
};

export const fetchWatches = createAsyncThunk("product/fetchclothes", async (page) => {
  const response = await axios.get(`${url}/Product/Watch/${page}`);
  return response.data;
});

export const fetchClothes = createAsyncThunk("product/fetchWatches", async (page) => {
  // console.log(page);
  const response = await axios.get(`${url}/Product/Clothes/${page}`);
  // console.log(response.data);

  return response.data;
});

export const fetchMobiles = createAsyncThunk("product/fetchMobiles", async (page) => {
  const response = await axios.get(`${url}/Product/Phone/${page}`);
  return response.data;
});

export const fetchhome = createAsyncThunk("product/home", async (page) => {
  const response = await axios.get(`${url}/Product/home/${page}`);
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    search_item: (state, action) => {
      console.log("from p");
      const id_product = action.payload;
      console.log("from p", id_product);
      const filterProducts = (list) => list.filter((product) => id_product.some((query) => product.id.toString() === query.toString()));
      state.searchResults = [...filterProducts(state.clothes.data), ...filterProducts(state.mobiles.data), ...filterProducts(state.watches.data)];
      console.log("from product", state.searchResults);
      return;
    },
  },
  extraReducers: (builder) => {
    //fetchWatches
    {
      builder
        .addCase(fetchWatches.pending, (state) => {
          state.watches.status = "loading";
        })
        .addCase(fetchWatches.fulfilled, (state, action) => {
          state.watches.status = "succeeded";
          //state.watches.data = action.payload;
          state.watches.data = [...state.watches.data, ...action.payload];
          state.watches.hasMore = !(action.payload.length < 8);
        })
        .addCase(fetchWatches.rejected, (state, action) => {
          state.watches.status = "failed";
          state.watches.error = action.error.message;
        });
    }

    //  fetchMobiles
    {
      builder
        .addCase(fetchMobiles.pending, (state) => {
          state.mobiles.status = "loading";
        })
        .addCase(fetchMobiles.fulfilled, (state, action) => {
          state.mobiles.status = "succeeded";
          // state.mobiles.data = action.payload;
          state.mobiles.data = [...state.mobiles.data, ...action.payload];
          state.mobiles.hasMore = !(action.payload.length < 8);
        })
        .addCase(fetchMobiles.rejected, (state, action) => {
          state.mobiles.status = "failed";
          state.mobiles.error = action.error.message;
        });
    }

    //fetchClothes
    {
      builder
        .addCase(fetchClothes.pending, (state) => {
          state.clothes.status = "loading";
        })
        .addCase(fetchClothes.fulfilled, (state, action) => {
          state.clothes.status = "succeeded";
          //state.clothes.data = action.payload;
          state.clothes.data = [...state.clothes.data, ...action.payload];
          state.clothes.hasMore = !(action.payload.length < 8);
        })
        .addCase(fetchClothes.rejected, (state, action) => {
          state.clothes.status = "failed";
          state.clothes.error = action.error.message;
        });
    }

    //fetchhome
    {
      builder
        .addCase(fetchhome.pending, (state) => {
          state.home.status = "loading";
        })
        .addCase(fetchhome.fulfilled, (state, action) => {
          state.home.status = "succeeded";
          state.home.data = [...state.home.data, ...action.payload];
          state.home.hasMore = !(action.payload.length < 8);
        })
        .addCase(fetchhome.rejected, (state, action) => {
          state.home.status = "failed";
          state.home.error = action.error.message;
        });
    }
  },
});

export const { search_item } = productSlice.actions;
export default productSlice.reducer;
