import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      // Assuming your API endpoint for registration is '/api/user/register'
      const response = await axios.post("/api/auth/register", {
        email,
        username,
        password
      });

      console.log("Registration successful response", response);
      console.log("Registration successful response.data:", response.data);

      // Notify the parent component about the registered user
      onRegister(response.data.user);

      // Reset the form
      setEmail("");
      setUsername("");
      setPassword("");

      setAlert(true);
      

    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed, Invalid email or password. Please try again.");
      // Reset the form
      setEmail("");
      setUsername("");
      setPassword("");
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
      {alert ? 
        <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Register Successful  — <Alert  action={
          <Link to="/"><Button color="success" variant="contained" size="large">
            <strong>Login!</strong>
          </Button></Link>
        }></Alert>
      </Alert>
    </Stack> : <></> }
      <div className="login-box">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
      <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
      </form>
      </div>
      </Box>
    </div>
  );
}

export default Register;
