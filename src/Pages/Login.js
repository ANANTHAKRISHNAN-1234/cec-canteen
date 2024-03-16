import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import canteen_logo1 from '../assets/canteen_logo1.png';
import './Login.css'
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="container wrapper bg-dark text-light mt-5">
        <div className='text-center'>
         <img src={canteen_logo1} alt="" className='login-img'/>
         </div>
        <h2 className="display-4 ">Login</h2>
        <p className="text-center">Please fill this form to create an account.</p>
        <form action="" method="POST" onSubmit={handleSubmit} >
          <div className="form-group">
            <label for="username">Username</label>
          <input type="email" name="username" id="username" className="form-control" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <span className="help-block"></span>
          </div>
  
          <div className="form-group ">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" className="form-control" placeholder="Your Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <span className="help-block"></span>
          </div>
  
          <div className="form-group mt-2 text-center">
            <input type="submit" className="btn btn-block btn-primary pe-5 ps-5 ft-5" value="Login"/>
          </div>
          <p className="mt-2">Don't have an account?  <Link to="/signup">Register</Link>.</p>
        </form>
      </section>
  )
}

export default Login