import React, {  useState  } from "react";
import axios from "axios";


function Signup({  onSignup, switchToLogin }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");


  const handleSignup  = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;

    }


    try {

      console.log("Payload:", { email,  password, confirmPassword }); 
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
        confirmPassword, 
      }
    );

       onSignup(response.data.token); 
    }
    
    catch (err) {

       console.error('Error during signup:',  err.response || err.message);
       setError(err.response?.data?.error  ||  "Signup failed");

    }

  };



  return (

    <div className="auth-container">

      <h1>
        Sign Up
        </h1>

      <form onSubmit={handleSignup}>

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required

        />


        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required

        />



        <button type="submit">Sign Up</button>

      </form>

      {error && 
      <p style={{ color: "red" }}>{error}
      </p>
      }


       <button onClick={switchToLogin}>Already have an account? Login</button>

    </div>

  );
}


export default Signup;
