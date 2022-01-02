import React, { useReducer, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import '../styles/UserForm.scss'

const USER_STUB = {
    accessLevel: 'CLIENT',
    active: true,
    address: '',
    login: '',
    pesel: '',
}

export default function UserForm({users, fetchData}) {

    let {uuid} = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {
        if (users) {
            setFormData({type: 'init'})
        }
    }, [])

    const formReducer = (state, action) => {
        console.log(action);
        switch (action.type) {
            case 'change':
                return {
                    ...state,
                    [action.payload.name]: action.payload.value
                }
            case 'submit':
                return {...USER_STUB}
            case 'init':
                return users.filter(u => u.uuid === uuid)[0];
            default:
                return state
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {
        ...USER_STUB
    })

    const handleChange = event => {
        if (event.target.type === 'checkbox') {
            setFormData({type: 'change', payload: {name: event.target.name, value: event.target.checked}})
        } else {
            setFormData({type: 'change', payload: {name: event.target.name, value: event.target.value}})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/users/${users ? uuid : ''}`, {
            method: users ? 'PUT' : 'POST', // if users var is present its edit-view hence PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                setFormData({type: 'submit'})
                fetchData()
                alert(`Udało się ${users ? 'edytować' : 'dodać'} użytkownika`)
            } else {
                alert(`Nie udało się ${users ? 'edytować' : 'dodać'} użytkownika`)
            }
            navigate('/');
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login-input">Login:</label>
                <input id="login-input" type="text" name="login" value={formData.login} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="login-input">Aktywny:</label>
                <input id="active-input" type="checkbox" name="active" checked={formData.active} value={formData.active} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="address-input">Adres:</label>
                <input id="address-input" type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="pesel-input">Pesel:</label>
                <input id="pesel-input" type="text" name="pesel" value={formData.pesel} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="">Poziom dostępu: </label>
                <div id="access-wrapper">
                    <input id="access-client" type="radio" name="accessLevel" value="CLIENT" checked={formData.accessLevel === 'CLIENT'} onChange={handleChange} />
                    <label htmlFor="access-client">Klient</label>
                    <input id="access-admin" type="radio" name="accessLevel" value="ADMINUSER" checked={formData.accessLevel === 'ADMINUSER'} onChange={handleChange} />
                    <label htmlFor="access-admin" >Admin</label>
                </div>
            </div>
            <div>
                <button type="submit">{ users ? "Edytuj" : "Dodaj"}</button>
            </div>
        </form>
    )
}
