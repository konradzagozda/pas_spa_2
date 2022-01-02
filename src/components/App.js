import logo from '../logo.svg';
import '../styles/App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Navbar";
import UserForm from "./UserForm";
import UsersList from "./UsersList";
import { useState, useEffect } from 'react';


function App() {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("/api/users/", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
            setUsers(result);
            console.log(result);
            }, (error) => { console.log(error)}
        )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={ <UsersList users={users} />} />
        <Route path="/add-user/" element={ <UserForm fetchData={fetchData} /> } />
        <Route path="/edit-user/:uuid" element={ <UserForm users={users} fetchData={fetchData}/> } />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
