import React, { useState, useEffect } from "react";
import { Routes, Route, } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Main from "./component/Main";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main/>}/>      
        <Route path="/login" element={<Login/>} />  
        <Route path="/signup" element={<SignUp/>} />  
      </Routes>
    </div>
  );
};

export default App;
