import { useState } from "react";
import useProduct from "../store/store";


const Component1 = () => {
  const { addProduct, loading, error } = useProduct();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // create product object
    const newProduct = {
      id: crypto.randomUUID(),
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
    };

    await addProduct(newProduct);
    setForm({ name: "", description: "", price: "", category: "" }); // reset form
  };

  return (
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Component1;
