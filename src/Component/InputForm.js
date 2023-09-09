import {React,useState} from 'react';
import { push, ref, set } from "firebase/database";
import { database, storage } from "../firebase";
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'

const DB_MESSAGES_KEY = "messages";
const STORAGE_KEY = "images/post/"

function InputForm(){
  const [state,setState]=useState({
    name: "",
    messageToSend:"",
    fileInputFile:null,
  })

  const writeData = async (fileInputFile) => {
    const messageListRef = ref(database, DB_MESSAGES_KEY);
    const newMessageRef = push(messageListRef);
    console.log(state.fileInputFile)
    const fullStorageRef = storageRef(storage,STORAGE_KEY+state.fileInputFile.name);
    await uploadBytes(fullStorageRef,state.fileInputFile);
    const url= await getDownloadURL(fullStorageRef,state.fileInputFile.name);
    await set(newMessageRef, {
      username:state.name,
      messageBody:state.messageToSend,
      date: new Date().toLocaleString(),
      imageName:fileInputFile.name,
      imageURL: url,
    });
  };

  const handleSubmit = (event) =>{
    event.preventDefault(event);
    writeData(state.fileInputFile);
    setState({
      ...state,
      messageToSend:"",
      fileInputFile:null,
    })
  }

  const handleNameSubmit = (event) =>{
    event.preventDefault(event);
    setState({...state,
      displayName:state.name
  });
  }
  
  const handleFileInput = (e) =>{
    console.log(e)
    setState({
      ...state,fileInputFile:e.target.files[0],
    })

  }
  
  const handleChange =(e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setState({...state,
      [name]:value,
    })
    console.log(state)
  }

  return(
    <>
      {state.displayName?<p>Hi {state.displayName}! Start Chatting!</p>:<p>Enter name to start chatting!</p>}
      

    {!state.displayName?
    <form>

      <input
        name="name"
        value={state.name}
        onChange={(e)=>handleChange(e)}
      />
      <button onClick={handleNameSubmit}>Enter Name</button>
    </form>
      :
    <form>
      <label>Enter message here:</label>
      <input
        name="messageToSend"
        value={state.messageToSend}
        onChange={(e)=>handleChange(e)}
      />
      <br/>
      <input
        type='file'
        name='file'
        onChange={(e)=>handleFileInput(e)}
      />
      <br/>
      <button onClick={handleSubmit}>Send</button>
    </form>}
      <br/>
    </>    




  )
}

export default InputForm;       