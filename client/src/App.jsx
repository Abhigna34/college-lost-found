import { Routes, Route } from "react-router-dom";
import ItemDetails from "./pages/ItemDetails";
import Navbar from "./components/Navbar";
import PostItem from "./pages/PostItem";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route
  path="/item/:id"
  element={<ItemDetails />}
/>
        <Route path="/register" element={<Register />} />
        
        <Route path="/post-item" element={<PostItem />}/>
       <Route
  path="/admin"
  element={<AdminDashboard />}
/>
        {/* PROTECTED ROUTE */}
        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

      </Routes>

    </div>

  );
}

export default App;