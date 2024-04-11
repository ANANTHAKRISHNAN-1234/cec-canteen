import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import canteen_logo1 from "../assets/canteen_logo1.png";
export default function AdminLogin() {
  const [adminemail, setAdminEmail] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/login", {
        adminemail,
        adminpassword,
      });
      const data = response.data;
      console.log(data);

      if (data.status === "ok") {
        // You can store the token in localStorage or sessionStorage for authentication
        localStorage.setItem("admintoken", data.user);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="container wrapper bg-dark text-light mt-5">
        <div className="text-center">
          <img src={canteen_logo1} alt="" className="login-img" />
        </div>
        <h2 className="display-4 ">Admin Login</h2>
        <p className="text-center">
          Please fill this form to create an account.
        </p>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Your Email"
              required
              value={adminemail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <span className="help-block"></span>
          </div>

          <div className="form-group ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Your Password"
              required
              value={adminpassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <span className="help-block"></span>
          </div>

          <div className="form-group mt-2 text-center">
            <input
              type="submit"
              className="btn btn-block btn-primary pe-5 ps-5 ft-5"
              value="Login"
            />
          </div>
          <p className="mt-2">
            Don't have an account? <Link to="/adminsignup">Register</Link>.
          </p>
        </form>
      </section>
    </div>
  );
}
