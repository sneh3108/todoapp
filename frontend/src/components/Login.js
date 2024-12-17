import React, { useState } from "react";
import axios from "axios";


function Login({ onLogin, switchToSignup }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error,  setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", {

        email,
        password,

      }
    );

      onLogin(response.data.token); 
    } 
    catch (err) {
      setError(err.response.data.error || "Invalid credentials");

    
    }

  };

  return (

    <div className="auth-container">
      
      <h1>
        Login
        </h1>
      <form onSubmit={handleLogin}>


        <input

          type="email"
          placeholder="Email"
          value={email}

          onChange={(e) => setEmail(e.target.value)}
          required

        />



        <input

          type="password"
          placeholder="Password"
          value = {password}
          onChange= {(e)  => setPassword(e.target.value)}
          required

        />


        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={switchToSignup}>Don't have an account? Sign Up</button>
    </div>

  );

}


 export default Login;





