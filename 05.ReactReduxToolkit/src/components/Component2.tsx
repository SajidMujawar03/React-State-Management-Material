import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { removeItem } from "../store/slices/todoSlice";
import type { AppDispatch } from "../store/store";
const Component2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.todo);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Todo List</h2>

      {todo.length > 0 ? (
        <div className="space-y-4">
          {todo.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-600">{t.description}</p>
              </div>

              <button
                onClick={() => dispatch(removeItem(t.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No todos added yet.</p>
      )}
    </div>
  );
};

export default Component2;
