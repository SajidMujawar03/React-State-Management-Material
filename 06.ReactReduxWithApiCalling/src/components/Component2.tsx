import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { fetchProducts } from "../store/slices/productSlice";

const Component2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, fetchLoading, fetchError } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetchLoading) return <p>Loading products...</p>;
  if (fetchError) return <p className="text-red-500">Failed to load products.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {data.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col"
        >
          <h2 className="font-bold text-lg mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="font-semibold mb-1">Price: ${product.price}</p>
          <p className="text-gray-500 text-sm">Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Component2;
