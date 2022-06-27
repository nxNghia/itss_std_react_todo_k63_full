import React, { useState } from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import SignIn from './components/SignIn'
import firebase from 'firebase/compat';
import './App.css'

function App() {
  const [username, setUsername] = useState("")
  const SignOut = () => {
    firebase.auth().signOut()
  }
  return (    
    <div className="container is-fluid">
        {username === ""?  <SignIn setUsername={setUsername}/> :(
        <div>
          <div className='nav'>
            <div className='info'>
              <button className="button is-primary is-inverted">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
              </button>
              {username}
            </div>
            <button class="button is-danger is-light is-small" onClick={SignOut}>Logout</button>
          </div>          
          <Todo/>
        </div>        
      ) }
    </div>
  );
}

export default App;
