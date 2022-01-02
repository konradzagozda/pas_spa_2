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


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={ <UsersList />} />
        <Route path="/add-user" element={ <UserForm /> } />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
