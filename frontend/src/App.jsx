import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Events from "./pages/Events";
import Timetable from "./pages/Timetable";
import Navigation from "./pages/Navigation";
import Admin from "./pages/Admin";
import AIAssistant from "./pages/AIAssistant";
import Signup from "./pages/Signup";
import { UserContext } from "./context/UserContext";

function ProtectedRoute() {
  const { currentUser, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/events" element={<Events />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;