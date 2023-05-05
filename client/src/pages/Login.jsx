import React from 'react'
import "../styles/Login.css"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    function login(e) {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BASE_URL}/login`, credentials)
            .then((response) => {
                console.log(response)
                alert("You have successfully LoggedIn")
                const token = response.data.data
                const user = jwt(token)
                localStorage.setItem('userId', user.userId)
                localStorage.setItem('authToken', response.data.data)
                navigate('/')
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setError(err.response.data.message);
                alert(err.response.data.message)
            })
    }

    return (
        <>
            <form>
                <div className='row g-2 align-items-center'>
                    <div className="col-auto">
                        <label htmlFor="inputEmail" className="col-form-label">Email</label>
                    </div>
                    <div className="col-auto">
                        <input type="email" name='email' value={credentials.email} onChange={handleInput} id="inputemail" className="form-control" />
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                    </div>
                    <div className="col-auto">
                        <input type="password" name='password' value={credentials.password} onChange={handleInput} id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" />
                    </div>
                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                        </span>
                    </div>
                </div>
                {
                    error && <div className="alert alert-warning" role="alert">
                        <strong>{error}</strong>
                    </div>
                }
                <button type="submit" onClick={login} className="btn btn-primary">Login</button>
            </form>
        </>
    )
}

export default Login
