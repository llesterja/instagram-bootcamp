import React, {useState,useEffect} from "react";
import { onChildAdded, push, ref, set } from "firebase/database";
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import { database, storage } from "./firebase";
import logo from "./logo.png";
import "./App.css";
import ChatRoom from "./Component/ChatRoom";
import InputForm from "./Component/InputForm";
import 'bootstrap/dist/css/bootstrap.min.css';

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = "messages";
const STORAGE_KEY = "images/post"

function App () {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Rocketgram Chat App
        </h1>

        <InputForm/>
        <ChatRoom/>
      </header>
    </div>
  );
}

export default App;
