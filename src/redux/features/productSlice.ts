import { Cart, Product } from "@/data/Product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialState = {
  // fetch All products in Array.
  loadingProducts: boolean;
  productsError: string;
  products: Product[];
  // fetch single product in Object.
  loadingProduct: boolean;
  productError: string;
  product: Product;
  // Cart
  cart: Cart[];
};

var cartItems =
  typeof window !== "undefined" && localStorage.getItem("productCart");

const initialState = {
  // fetch all products in array.
  loadingProducts: false,
  productsError: "",
  products: [],
  // fetch single product in Object.
  loadingProduct: false,
  productError: "",
  product: {},
  //Cart
  cart: cartItems ? JSON.parse(cartItems) : [],
} as unknown as InitialState;

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
  reducers: {
    handleAddToCart: (state, action) => {
      var cartArray = [];
      var selectedArray = action.payload;
      const localStorageCart =
        typeof window !== "undefined" && localStorage.getItem("productCart");

      // parsing the data
      if (localStorageCart) {
        cartArray = JSON.parse(localStorageCart);
      }

      // merge two array
      let data: Cart[] = [...cartArray, ...selectedArray];

      let array: Cart[] = [];
      let uniqueObj: { [key: string]: Cart } = {};
      for (let i in data) {
        let id = data[i]["id"];
        uniqueObj[id] = data[i];
      }

      // unique object of array
      for (let i in uniqueObj) {
        array.push(uniqueObj[i]);
      }

      typeof window !== "undefined";
      localStorage.setItem("productCart", JSON.stringify(array));

      state.cart = array || [];
    },
    // Removing one attaraction from the cart.
    handleRemoveFromCart: (state, action) => {
      const cart = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
      state.cart = cart;
      typeof window !== "undefined";
      localStorage.setItem("productCart", JSON.stringify(cart));
    },
    // Emptying the full cart.
    handleEmptyCart: (state, action) => {
      const cart: Cart[] = [];
      state.cart = cart;
      typeof window !== "undefined";
      localStorage.setItem("productCart", JSON.stringify(cart));
    },
  },
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

export const { handleAddToCart, handleEmptyCart, handleRemoveFromCart } =
  productSlice.actions;

export default productSlice.reducer;
