import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignupClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  };

  const handleSigninClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container" id="container">
      <div className="form-con signup_container">
        <form onSubmit={handleSubmit1}>
          <h1>Create Account</h1>
          <div class="social">
                <ul>
                    <li><a href="https://www.facebook.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.83008 0C0.641577 0 0 0.640828 0 8.83008V21.1699C0 29.3584 0.641578 30 8.83008 30H21.1699C29.3584 30 30 29.3592 30 21.1699V8.83008C30 0.640828 29.3592 0 21.1699 0H8.83008ZM6.87598 3H23.124C26.7188 3 27 3.28123 27 6.87598V23.124C27 26.7188 26.718 27 23.124 27H19.9629V18.0293H23.5151L24.0747 14.0376H19.9629C19.9629 14.0376 19.9569 11.6994 19.9629 11.1167C19.9749 9.97595 20.9281 9.39898 21.7471 9.40723C22.5661 9.41623 24.2622 9.41016 24.2622 9.41016V5.73047C24.2622 5.73047 22.7939 5.53968 21.2534 5.52393C19.9589 5.51043 18.5295 5.86143 17.376 7.02393C16.2022 8.20593 16.0171 9.9669 15.9946 12.1187C15.9879 12.7404 15.9946 14.0361 15.9946 14.0361H12.5186V18.0278H15.9946V27H6.87598C3.28123 27 3 26.718 3 23.124V6.87598C3 3.28123 3.28123 3 6.87598 3Z" fill="black"/>
                        </svg></a>
                        </li>
                    <li><a href="https://www.instagram.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8652 0C1.07948 0 0 1.07948 0 14.8652V15.1348C0 28.9205 1.07948 30 14.8652 30H15.1348C28.9205 30 30 28.9205 30 15.1348V15C30 1.089 28.911 0 15 0H14.8652ZM12 3H18C26.3467 3 27 3.65325 27 12V18C27 26.3467 26.3467 27 18 27H12C3.65325 27 3 26.3467 3 18V12C3 3.65325 3.65325 3 12 3ZM22.4956 6C21.6669 6.00225 20.9977 6.67564 21 7.50439C21.0023 8.33314 21.6756 9.00225 22.5044 9C23.3331 8.99775 24.0023 8.32436 24 7.49561C23.9977 6.66686 23.3244 5.99775 22.4956 6ZM14.9824 7.5C10.8409 7.50975 7.49025 10.8761 7.5 15.0176C7.50975 19.1591 10.8761 22.5098 15.0176 22.5C19.1591 22.4902 22.5098 19.1239 22.5 14.9824C22.4902 10.8409 19.1239 7.49025 14.9824 7.5ZM14.9897 10.5C17.4745 10.494 19.494 12.505 19.5 14.9897C19.5053 17.4745 17.495 19.494 15.0103 19.5C12.5255 19.506 10.506 17.4958 10.5 15.0103C10.494 12.5255 12.505 10.506 14.9897 10.5Z" fill="black"/>
                        </svg></a>
                        </li>
                    <li><a href="https://in.linkedin.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.83008 0C0.641577 0 0 0.640828 0 8.83008V21.1699C0 29.3584 0.641578 30 8.83008 30H21.1699C29.3584 30 30 29.3592 30 21.1699V8.83008C30 0.640828 29.3592 0 21.1699 0H8.83008ZM6.87598 3H23.124C26.7188 3 27 3.28123 27 6.87598V23.124C27 26.7188 26.718 27 23.124 27H6.87598C3.28123 27 3 26.718 3 23.124V6.87598C3 3.28123 3.28123 3 6.87598 3ZM7.87646 4.87793C6.65471 4.87793 5.66455 5.86813 5.66455 7.08838C5.66455 8.30863 6.65396 9.30029 7.87646 9.30029C9.09521 9.30029 10.0854 8.30938 10.0854 7.08838C10.0854 5.86963 9.09521 4.87793 7.87646 4.87793ZM19.4502 10.7417C17.6052 10.7417 16.3676 11.7541 15.8613 12.7134H15.8086V11.0464H12.1714V23.25H15.9609V17.2119C15.9609 15.6197 16.2655 14.0786 18.2388 14.0786C20.1843 14.0786 20.209 15.9007 20.209 17.3159V23.25H24V16.5557C24 13.2692 23.2909 10.7417 19.4502 10.7417ZM5.97949 11.0464V23.25H9.77197V11.0464H5.97949Z" fill="black"/>
                        </svg></a>
                        </li>
                </ul>
			</div>
          <span>or use your email for registration </span>
          <input type="text" placeholder="Name" />
          <input type="email" name="username" id="username" className="form-control" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-con signin_container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div class="social">
                <ul>
                    <li><a href="https://www.facebook.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.83008 0C0.641577 0 0 0.640828 0 8.83008V21.1699C0 29.3584 0.641578 30 8.83008 30H21.1699C29.3584 30 30 29.3592 30 21.1699V8.83008C30 0.640828 29.3592 0 21.1699 0H8.83008ZM6.87598 3H23.124C26.7188 3 27 3.28123 27 6.87598V23.124C27 26.7188 26.718 27 23.124 27H19.9629V18.0293H23.5151L24.0747 14.0376H19.9629C19.9629 14.0376 19.9569 11.6994 19.9629 11.1167C19.9749 9.97595 20.9281 9.39898 21.7471 9.40723C22.5661 9.41623 24.2622 9.41016 24.2622 9.41016V5.73047C24.2622 5.73047 22.7939 5.53968 21.2534 5.52393C19.9589 5.51043 18.5295 5.86143 17.376 7.02393C16.2022 8.20593 16.0171 9.9669 15.9946 12.1187C15.9879 12.7404 15.9946 14.0361 15.9946 14.0361H12.5186V18.0278H15.9946V27H6.87598C3.28123 27 3 26.718 3 23.124V6.87598C3 3.28123 3.28123 3 6.87598 3Z" fill="black"/>
                        </svg></a>
                        </li>
                    <li><a href="https://www.instagram.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8652 0C1.07948 0 0 1.07948 0 14.8652V15.1348C0 28.9205 1.07948 30 14.8652 30H15.1348C28.9205 30 30 28.9205 30 15.1348V15C30 1.089 28.911 0 15 0H14.8652ZM12 3H18C26.3467 3 27 3.65325 27 12V18C27 26.3467 26.3467 27 18 27H12C3.65325 27 3 26.3467 3 18V12C3 3.65325 3.65325 3 12 3ZM22.4956 6C21.6669 6.00225 20.9977 6.67564 21 7.50439C21.0023 8.33314 21.6756 9.00225 22.5044 9C23.3331 8.99775 24.0023 8.32436 24 7.49561C23.9977 6.66686 23.3244 5.99775 22.4956 6ZM14.9824 7.5C10.8409 7.50975 7.49025 10.8761 7.5 15.0176C7.50975 19.1591 10.8761 22.5098 15.0176 22.5C19.1591 22.4902 22.5098 19.1239 22.5 14.9824C22.4902 10.8409 19.1239 7.49025 14.9824 7.5ZM14.9897 10.5C17.4745 10.494 19.494 12.505 19.5 14.9897C19.5053 17.4745 17.495 19.494 15.0103 19.5C12.5255 19.506 10.506 17.4958 10.5 15.0103C10.494 12.5255 12.505 10.506 14.9897 10.5Z" fill="black"/>
                        </svg></a>
                        </li>
                    <li><a href="https://in.linkedin.com/"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.83008 0C0.641577 0 0 0.640828 0 8.83008V21.1699C0 29.3584 0.641578 30 8.83008 30H21.1699C29.3584 30 30 29.3592 30 21.1699V8.83008C30 0.640828 29.3592 0 21.1699 0H8.83008ZM6.87598 3H23.124C26.7188 3 27 3.28123 27 6.87598V23.124C27 26.7188 26.718 27 23.124 27H6.87598C3.28123 27 3 26.718 3 23.124V6.87598C3 3.28123 3.28123 3 6.87598 3ZM7.87646 4.87793C6.65471 4.87793 5.66455 5.86813 5.66455 7.08838C5.66455 8.30863 6.65396 9.30029 7.87646 9.30029C9.09521 9.30029 10.0854 8.30938 10.0854 7.08838C10.0854 5.86963 9.09521 4.87793 7.87646 4.87793ZM19.4502 10.7417C17.6052 10.7417 16.3676 11.7541 15.8613 12.7134H15.8086V11.0464H12.1714V23.25H15.9609V17.2119C15.9609 15.6197 16.2655 14.0786 18.2388 14.0786C20.1843 14.0786 20.209 15.9007 20.209 17.3159V23.25H24V16.5557C24 13.2692 23.2909 10.7417 19.4502 10.7417ZM5.97949 11.0464V23.25H9.77197V11.0464H5.97949Z" fill="black"/>
                        </svg></a>
                        </li>
                </ul>
			    </div>
          <span>or use your account</span>
          <input type="email" name="username" id="username" className="form-control" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" name="password" id="password" className="form-control" placeholder="Your Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="butt" onClick={handleSigninClick}>Sign In</button>
          </div>
          <div className="panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="butt" onClick={handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;