import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Pages/Home'
import Question from './Pages/Question'
import Cookies from 'js-cookie';

function App() {
  const [session, setSession] = useState(null);
  const [dark, setdark] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [z,setz] = useState("")
  const [rating,setRating] = useState(Cookies.get("rating")===undefined?0:Cookies.get("rating"))
  useEffect(()=>{
    Cookies.set("rating",rating)
  },[rating])

  return (
    <main className={dark ? "dark text-foreground bg-background" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home rating={{rating,setRating}} toggle={{ dark, setdark }} session={session} loggedin={loggedin} setlogin={setLoggedin} setz={setz} z={z}/>} />
          <Route path="/question/*" element={<Question rating={{rating,setRating}} toggle={{ dark, setdark }} session={session} loggedin={loggedin} setz={setz} z={z}/> } />

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App;

