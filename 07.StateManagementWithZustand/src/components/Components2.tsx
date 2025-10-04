import useBear from "../store/bearStore";

const Components2 = () => {
  const { bears, removeBear } = useBear();

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Bear List</h2>
      {bears.length === 0 && <p className="text-gray-500">No bears added yet.</p>}
      <ul className="space-y-2">
        {bears.map((bear, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border rounded-md"
          >
            <div>
              <p className="font-semibold">{bear.name}</p>
              <p className="text-gray-600 text-sm">{bear.description}</p>
            </div>
            <button
              onClick={() => removeBear(bear.name)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Components2;
