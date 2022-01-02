import React from 'react'

import {
  Link
} from "react-router-dom";

import '../styles/Navbar.scss';

export default function Navbar() {
    return (
      <ul className="navbar">
        <li><Link to="/">Lista użytkowników</Link></li>
        <li><Link to="/add-user">Dodaj użytkownika</Link></li>
      </ul>
    )
}
