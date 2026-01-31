import { Routes, Route } from "react-router-dom";
import ViewStatus from "../pages/student/ViewStatus"; 
import Login from "../pages/auth/Login";
import StudentDashboard from "../pages/student/StudentDashboard";
import SubmitProject from "../pages/student/SubmitProject";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/submit"
        element={
          <ProtectedRoute role="student">
            <SubmitProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      

      <Route
           path="/student/status"
           element={
              <ProtectedRoute role="student">
                 <ViewStatus />
              </ProtectedRoute>
           }
      />

    </Routes>
  );
}
