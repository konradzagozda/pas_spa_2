import React from 'react'
import { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";

import '../styles/UsersList.scss'

export default function UsersList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
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
    }, [])

    return (
        <div id="users-div">
            {users.map(u => {
                return (
                    <div className="user-div" key={u.uuid}>
                        <div><label>Login: </label> {u.login}</div>
                        <div><label>UUID: </label> {u.uuid}</div>
                        <div><label>Poziom dostępu: </label> {u.accessLevel}</div>
                        <div><label>Pesel: </label> {u.pesel}</div>
                        <div><label>Adres: </label> {u.address}</div>
                        <div><label>Aktywny: </label> {u.active ? 'tak' : 'nie'}</div>
                    </div>
                )
            })}
        </div>

    )
}
