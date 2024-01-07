import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      // Start loading
      setLoading(true);

      // Make a request to your backend server for authentication
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // Assuming your backend returns a user object upon successful login
      
      const token = response.data.token;
      const userId = response.data.userId;
      const user = { userId, token, email };

      // set defaults
      axios.defaults.headers.common = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      console.log("localStorage.getItem from login.js: ", loggedInUser);

      // Notify the parent component (App.js) about the successful login
      onLogin(user);
    } catch (error) {
      // Handle login errors
      console.error("Login failed", error);
      //localStorage.setItem("user", null);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
    <Box
        sx={{  
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <div className="">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {loading ? (
                <LinearProgress size={100} thickness={50} color="secondary" /> // Display loader while loading
              ) : (<Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Login</Button>)}
          
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
      </Box>
    </div>
  );
}

export default Login;

