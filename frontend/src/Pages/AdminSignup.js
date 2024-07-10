import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import canteen_logo1 from "../assets/canteen_logo1.png";
import axios from "axios";
import "./Signup.css";
const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(axios);
      const response = await axios.post(
        "http://localhost:7000/api/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);

      if (data.status === "ok") {
        navigate("/adminlogin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section class="container wrapper bg-dark mt-5">
      <h2 class="display-4 pt-3 text-white">Admin Sign Up</h2>
      <p class="text-center text-white">Please fill in your credentials.</p>
      <form action="POST" method="POST" onSubmit={handleSubmit}>
        <div class="form-group text-light">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            class="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span class="help-block"></span>
        </div>

        <div class="form-group  text-light">
          <label for="email text-white">Email</label>
          <input
            type="email"
            name="password"
            id="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span class="help-block"></span>
        </div>

        <div class="form-group text-light">
          <label for="password"> Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span class="help-block"></span>
        </div>

        <div class="form-group mt-2 text-center">
          <input
            type="submit"
            class="btn btn-block btn-success pe-5 ps-5 ft-5"
            value="Submit"
          />
        </div>
        <p class="text-light mt-2">
          Already have an account? <Link to="/adminlogin">Login</Link>.
        </p>
      </form>
    </section>
  );
};

export default AdminSignup;
