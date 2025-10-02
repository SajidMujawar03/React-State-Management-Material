import { useSelector } from "react-redux";
import type { State } from "../store/store";


const Component1 = () => {
  const {user,isLoggedIn}=useSelector((state:State)=>state)


  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {isLoggedIn ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Info</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center">No User Logged In</div>
      )}
    </div>
  );
};

export default Component1;
