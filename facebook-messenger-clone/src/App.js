import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, SetMessages] = useState([]);
  const [username, SetUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      SetMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
      SetUsername(prompt('Please enter your name'));
  }, [])
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <img 
        width="100px" 
        height="100px" 
        src="https://scontent.fmmx1-1.fna.fbcdn.net/v/t1.6435-1/p200x200/121144316_4235843479868633_1561909311908486242_n.png?_nc_cat=1&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=Jef2izPRe20AX9ASqHv&_nc_oc=AQlIjmi3FshL0k1YR8QVbZvW2essD0H4gzJGf3LaOFW2ESazb_w-sy5YtGlvhJiUO_U&_nc_ht=scontent.fmmx1-1.fna&tp=30&oh=9714ea9c79734b013a8b8b0f6c995ae6&oe=60C2E001"
      />
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome {username}</h2>

      {/* Messages */}
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
      
      {/* Input field */}
      <form className="appForm">
        <FormControl className="appFormControll">
          {/* <InputLabel>Type a message</InputLabel> */}
          <Input placeholder="Enter a message" className="appInputField" value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton
          className="appIconButton"
          disabled={!input}
          variant="contained"
          color="primary"
          type='submit' 
          onClick={sendMessage}><SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}
export default App;
