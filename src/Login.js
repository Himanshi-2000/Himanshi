import React from 'react';
import './login.css'; 

function Login({ username, password, setUsername, setPassword, onLogin, error }) {
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className='login-input'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className='login-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login-button' onClick={onLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
