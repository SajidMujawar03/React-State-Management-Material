import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type Product = {
  title: string;
  description: string;
  id: string;
  price: number;
  category: string;
};

type ProductsState = {
  data: Product[];
  fetchLoading: boolean;
  fetchError: boolean;
  addLoading: boolean;
  addError: boolean;
};

const initialState: ProductsState = {
  data: [] as Product[],
  fetchLoading: false,
  fetchError: false,
  addLoading: false,
  addError: false,
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return (await response.json()) as Product[];
});

export const addProduct = createAsyncThunk(
  "addProduct",
  async (product: Product) => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data; // <-- this becomes action.payload in addProduct.fulfilled
  }
);

export const removeProduct = createAsyncThunk("removeProduct", async () => {});

const todoSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state: ProductsState) => {
        state.fetchLoading = true;
        state.fetchError = false;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<Product[]>) => {
          state.fetchLoading = false;
          console.log(action.payload);
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state: ProductsState) => {
        state.fetchLoading = false;
        state.fetchError = true;
      })

      // addProduct
      .addCase(addProduct.pending, (state: ProductsState) => {
        state.addLoading = true;
        state.addError = false;
      })
      .addCase(
        addProduct.fulfilled,
        (state: ProductsState, action: PayloadAction<Product>) => {
          state.addLoading = false;

          state.data = [...state.data, action.payload];
        }
      )
      .addCase(addProduct.rejected, (state: ProductsState) => {
        state.addLoading = false;
        state.addError = true;
      });
  },
});

export default todoSlice.reducer;
