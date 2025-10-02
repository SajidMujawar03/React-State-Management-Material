import Component1 from "./components/Component1";
import Component2 from "./components/Component2";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Auth Demo</h1>

      <div className="w-full max-w-md">
        <Component1 />
      </div>

      <div className="w-full max-w-md">
        <Component2 />
      </div>
    </div>
  );
}

export default App;
