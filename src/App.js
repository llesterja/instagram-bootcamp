import React, {useState,useEffect} from "react";
import { onChildAdded, push, ref, set } from "firebase/database";
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import { database, storage } from "./firebase";
import logo from "./logo.png";
import "./App.css";
import ChatRoom from "./Component/ChatRoom";
import InputForm from "./Component/InputForm";



function App () {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Rocketgram Insta Posts
        </h1>

        <InputForm/>
        <ChatRoom/>
      </header>
    </div>
  );
}

export default App;
