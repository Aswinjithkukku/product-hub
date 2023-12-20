import { Product } from "@/data/Product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialState = {
  // fetch All products in Array.
  loadingProducts: boolean;
  productsError: string;
  products: Product[];
  // fetch single product in Object.
  loadingProduct: boolean;
  productError: string;
  product: Product | {};
};

const initialState = {
  // fetch all products in array.
  loadingProducts: false,
  productsError: "",
  products: [],
  // fetch single product in Object.
  loadingProduct: false,
  productError: "",
  product: {},
} as InitialState;

// fetch all products.
const fetchProducts = createAsyncThunk(
  "/productSlice/fetchProducts",
  async (_, { getState }) => {
    const response = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );

    return response;
  }
);

// fetch single product.
const fetchProduct = createAsyncThunk(
  "/productSlice/fetchProduct",
  async (args) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${args}`
    ).then((res) => res.json());

    return response;
  }
);

const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loadingProducts = true;
        state.productsError = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.productsError = action.error.message || "Something went wrong!!";
      })
      // CASE - Single Product
      .addCase(fetchProduct.pending, (state, action) => {
        state.loadingProduct = true;
        state.productError = "";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.productError = action.error.message || "Something went wrong!!";
      });
  },
});

export { fetchProducts, fetchProduct };

// export const {  } = productSlice.actions;

export default productSlice.reducer;
