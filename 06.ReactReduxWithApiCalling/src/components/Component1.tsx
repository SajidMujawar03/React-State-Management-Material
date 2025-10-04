import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/slices/productSlice";
import type { AppDispatch, RootState } from "../store/store";

const Component1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addLoading, addError } = useSelector(
    (state: RootState) => state.product
  );

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = { ...form, price: Number(form.price) };
    dispatch(addProduct(product));
    setForm({ id: "", title: "", description: "", price: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {addError && (
        <p className="text-red-500">Failed to add product. Please try again.</p>
      )}
      <div>
        <label htmlFor="id">Id:</label>
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <button
        type="submit"
        disabled={addLoading}
        className={`p-2 mt-2 rounded text-white ${
          addLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
      >
        {addLoading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default Component1;
