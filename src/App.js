import { AuthContext } from "./context/AuthContext.js";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";
import { BrowserRouter as Router} from "react-router-dom";


import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";


function App() {
  const {user} = useContext(AuthContext)
  // const navigate = useNavigate();
  return (
    <Router>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login/>} />
      <Route path="/profile/:username" element={<Profile/>} />
      <Route path="/login" element={ <Login/>} />
      <Route path="/register" element={ <Register/>} />
    </Routes>
    </Router>
  );
}

export default App;
