// src/pages/Dashboard.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import toast from "react-hot-toast";
import Loader from "../hooks/loader";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, set_isLoading] = useState(false);

  const handleLogout = () => {
    set_isLoading(true);
    logout();
    toast.success("You have been logged out");
    navigate("/");
    set_isLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard!</h1>
      <p className="mb-4">
        Your token: <code className="text-sm bg-gray-100 p-1">{token}</code>
      </p>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        <Loader isLoading={isLoading} />
        Logout
      </button>
    </div>
  );
}
