import React, { useState, useEffect } from "react";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';

function Header({ onLogout }) {
  const [currentTime, setCurrentTime] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("localStorage user from header",user);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().toLocaleString()
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      console.log("Logout successful");
      window.location.reload(true);
      //onLogout(); // Notify the parent component (App.js) about the successful logout
      
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <header>
      <div className="header-content">
        <h1>memoMaster <TipsAndUpdatesIcon/></h1>
        <h3>
          hello, {user !== null ? user.email : "world!"}
        </h3>
        <h3>{currentTime}</h3>
        {user !== null  ? <Button color="secondary" variant="contained" onClick={handleLogout} ><h3>Logout</h3> </Button> : ""}
        
      </div>
    </header>
  );
}

export default Header;