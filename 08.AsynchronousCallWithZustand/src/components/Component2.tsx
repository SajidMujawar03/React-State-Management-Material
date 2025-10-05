import { useEffect } from "react";
import useProduct from "../store/store";

const Component2 = () => {
  const { products, fetchProduct, loading, error } = useProduct();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={fetchProduct}>FetchProducts</button>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "6px",
            }}
          >
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>
              <strong>₹{p.price}</strong> — {p.category}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Component2;
