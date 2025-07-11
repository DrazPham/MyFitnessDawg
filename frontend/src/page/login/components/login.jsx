import React, { useState } from 'react';
import 'assets/css/login-signup/index.css';

function LoginPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  return (
    <div className={`LogInContainer ${isSignUpActive ? 'right-panel-active' : ''}`} id="LogInContainer">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Fresh Start!</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Hop In!</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Welcome Back!</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Let's go</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Back on Track</h1>
            <p>Got an account? Let's reconnect—log in now!</p>
            <button className="ghost" onClick={() => setIsSignUpActive(false)}>Jump Back In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hey there!</h1>
            <p>Jump into your health journey—just fill in your details to begin.</p>
            <button className="ghost" onClick={() => setIsSignUpActive(true)}>Become a Tracker</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
