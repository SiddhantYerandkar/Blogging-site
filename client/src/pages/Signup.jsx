import React, { useState } from 'react'
import axios from 'axios'
import "../styles/Signup.css"

const Signup = () => {

    const [post, setPost] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleInput = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BASE_URL}/register`, post)
            .then((response) => {
                console.log(response)
                alert(response.data.message)
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.message);
            })

    }

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="name" name='name' value={post.name} onChange={handleInput} className="form-control" id="exampleInputName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={post.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={post.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" />
                </div>
                {
                    error && <div className="alert alert-warning" role="alert">
                        <strong>{error}</strong>
                    </div>
                }
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Register</button>
            </form>

        </>
    )
}

export default Signup
