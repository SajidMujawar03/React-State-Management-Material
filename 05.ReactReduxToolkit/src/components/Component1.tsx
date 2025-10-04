import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../store/slices/todoSlice";
import type { AppDispatch } from "../store/store";
const Component1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name) return;
    dispatch(addItem(formData));
    setFormData({ id: "", name: "", description: "" }); // reset
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Todo</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Id:
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Component1;
