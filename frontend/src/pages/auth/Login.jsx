import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    try {
      const decoded = jwtDecode(res.credential);

      // send to backend
      const response = await axios.post(
        "https://project-monitoring-evaluation-system.onrender.com/api/auth/google",
        {
          name: decoded.name,
          email: decoded.email
        }
      );

      const user = response.data;

      login(user);

      // role based redirect
      if (user.role === "faculty") {
        navigate("/faculty");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Project Monitoring System
        </h2>

        <GoogleLogin
          onSuccess={googleSuccess}
          onError={() => alert("Login Failed")}
        />
      </div>
    </div>
  );
}
