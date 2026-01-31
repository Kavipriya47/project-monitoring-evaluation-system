import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const linkStyle = ({ isActive }) =>
    isActive
      ? "block bg-blue-800 px-4 py-2 rounded"
      : "block px-4 py-2 hover:bg-blue-700 rounded";

  return (
    <div className="w-64 bg-blue-600 text-white p-6">
      <h2 className="text-xl font-bold mb-6">PMES</h2>

      {user?.role === "student" && (
        <>
          <NavLink to="/student" className={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/student/submit" className={linkStyle}>
            Submit Project
          </NavLink>
          <NavLink to="/student/status" className={linkStyle}>
            Status
          </NavLink>
        </>
      )}

      {user?.role === "faculty" && (
        <NavLink to="/faculty" className={linkStyle}>
          Dashboard
        </NavLink>
      )}
    </div>
  );
}
