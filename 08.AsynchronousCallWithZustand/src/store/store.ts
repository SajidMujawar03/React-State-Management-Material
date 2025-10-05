import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type ProductStore = {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => Promise<void>;
  fetchProduct: () => Promise<void>;
};

const useProduct = create<ProductStore>()(
  devtools(
    persist(
        (set) => ({
      products: [],
      loading: false,
      error: null,

      // ✅ Add product API call
      addProduct: async (product) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });

          if (!response.ok) {
            throw new Error("Failed to add product");
          }

          const newProduct = await response.json();

          // Update store after successful POST
          set((state) => ({
            products: [...state.products, newProduct],
            loading: false,
          }));
        } catch (err: unknown) {
          const error =
            err instanceof Error ? err.message : "An unknown error occurred";
          set({ error, loading: false });
          console.error("Error fetching products:", err);
        }
      },

      // ✅ Fetch products API call
      fetchProduct: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          set({ products: data, loading: false });
        } catch (err: unknown) {
          const error =
            err instanceof Error ? err.message : "An unknown error occurred";
          set({ error, loading: false });
          console.error("Error fetching products:", err);
        }
      },
    }),
    {name:"productStore"}
)
  )
);

export default useProduct;
