import React,  { useState, useEffect }  from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import  TodoList from "./components/TodoList";
import  axios from "axios";


function App() {

  const  [isAuthenticated,   setIsAuthenticated] =  useState(false);
  const [isSignup, setIsSignup] =   useState(false);

  
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, 
  []);

  const handleLogin =  (token) => {
    localStorage.setItem("token", token);
     setIsAuthenticated(true);
   };

   const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

   return (
     <div>
        {isAuthenticated ? (
        <TodoList onLogout=  {handleLogout} />
      ) 
      : isSignup
       ? 
      (
        <Signup
          onSignup={handleLogin}
          switchToLogin={() => setIsSignup(false)}
        />
      ) 
      : 
      (
        <Login
          onLogin={handleLogin}
          switchToSignup={ () => setIsSignup(true)}
        />
      )
      }
    </div>

  );

}


export default App;

