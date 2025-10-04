import Component1 from "./components/Component1";
import Component2 from "./components/Component2";

function App() {
  return (
    <div className="grid grid-cols gap-4 p-4">
      <div className="flex-1 border p-2">
        <Component1 />
      </div>
      <div className="flex-1 border p-2">
        <Component2 />
      </div>
    </div>
  );
}

export default App;
