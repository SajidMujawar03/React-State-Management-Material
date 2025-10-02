import React, { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../store/store";
// import useAuth from "../hooks/useAuth";

type User = {
  name: string;
  email: string;
  password: string;
};

const Component2 = () => {
  const dispatch = useDispatch();
  const {isLoggedIn}=useSelector((state:State)=>state)
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({type:"login",payload:formData})
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {isLoggedIn ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-700 font-medium">You are logged in</p>
          <button
            onClick={()=>dispatch({type:"logout"})}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Component2;
