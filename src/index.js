import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Protected from "./Components/Protected";
import Anonymous from "./Components/AnonymousRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import Dashboard from "./Pages/Dashboard";
import AdminMenu from "./Pages/AdminMenu";
import Protected2 from "./Components/Protected2";
import Anonymous2 from "./Components/AnonymousRoute2";
import MenuPage from "./Components/MenuPage/MenuPage";
import CartPage from "./Pages/CartPage";
import AdminOrder from "./Pages/AdminOrder";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<Signup />} />
      <Route path="/login" element={<Anonymous />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Home />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/adminsignup" element={<AdminSignup />} />
      <Route path="/adminlogin" element={<Anonymous2 />}>
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Route>
      <Route path="/admin-dashboard" element={<Protected2 />}>
        <Route path="/admin-dashboard" index element={<Dashboard />} />
      </Route>
      <Route path="/admin-menu" element={<AdminMenu />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/adminorders" element={<AdminOrder />} />
      <Route path="/users" element={<Users />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
