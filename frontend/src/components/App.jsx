import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Login";
import Register from "./Register";

// change the server url for render https://memo-master-api.onrender.com
// for local http://localhost:3000
axios.defaults.baseURL = "https://memo-master-api.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log("loggedInUser from checkLoginStatus App.js:", loggedInUser);

        if (loggedInUser) {
          setUser(loggedInUser);
          console.log("user after setUser from checkLoginStatus App.js:", user);

          // set defaults, @@@ token
          axios.defaults.headers.common = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.token}`,
          };

          const url = `/api/notes/${loggedInUser.userId}`;
          const response = await axios.get(url);

          if (response.status === 200) {
            setNotes(response.data);
            console.log("Notes from checkLoginStatus App.js:", notes);
          }
        }
      } catch (error) {
        const loggedInUser = localStorage.setItem("user", null);
        console.log(
          "localStorage loggedInUser reset checkLoginStatus App.js:",
          loggedInUser
        );
        console.error(
          "Error checking login status after localStorage reset",
          error
        );
        setUser(null);
        setNotes([]);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleLogin = async (user) => {
    try {
      setUser(user);
      console.log("User from handleLogin App.js:", user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      setUser(response.data.user);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const fetchUserNotes = async () => {
    try {
      const userId = user.userId;
      const url = `/api/notes/${userId}`;
      const response = await axios.get(url);

      console.log("Response from fetchUserNotes App.js:", response.data);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes", error.toJSON());
    }
  };

  return (
    <BrowserRouter>
      <div id='page-container'>
        <Header />
        <div id='content-wrap'>
          <Routes>
            <Route
              path='/login'
              element={
                user ? <Navigate to='/' /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path='/register'
              element={
                user ? (
                  <Navigate to='/' />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              }
            />
            <Route
              path='/'
              element={
                user ? (
                  <>
                    <CreateArea onAdd={fetchUserNotes} />
                    {notes.map((noteItem, index) => (
                      <Note
                        key={index}
                        id={index}
                        noteId={noteItem._id}
                        title={noteItem.title}
                        time={noteItem.time}
                        content={noteItem.content}
                        onDelete={fetchUserNotes}
                      />
                    ))}
                  </>
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
          </Routes>
        </div>
        <div id='footer'>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
