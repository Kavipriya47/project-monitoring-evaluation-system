import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">
      <h2 className="font-semibold text-lg">
        Project Monitoring System
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
