import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./Firebase";

const App = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if(user){
        setUserName(user)
    
      }else{
        setUserName("");
      }
    })
  }, [])
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home props={userName}/>} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
