import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, SetMessages] = useState([{username: 'sonny', text:'Hejsan'},{username: 'Necika', text:'Djesba'}]);
  const [username, SetUsername] = useState('');

  useEffect(() => {
      SetUsername(prompt('Please enter your name'));
  }, [])
  const sendMessage = (event) => {
    event.preventDefault();
    SetMessages([...messages, {username: username, text: input} ]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome {username}</h2>

      {/* Messages */}

      {
        messages.map(message => (
          <Message username={message.username} text={message.text} />
        ))
      }
      
      {/* Input field */}
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
          <Button 
          disabled={!input}
          variant="contained"
          color="primary"
          type='submit' 
          onClick={sendMessage}>Send message
        </Button>
        </FormControl>
      </form>
    </div>
  );
}
export default App;
