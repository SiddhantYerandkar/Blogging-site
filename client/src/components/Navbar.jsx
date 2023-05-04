import React from 'react'
import "../styles/Navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
        navigate('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Based Blogs</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/contact">Contact</a>
                            </li>
                            {(localStorage.getItem('authToken')) ? <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/createPost">Create Post</a>
                            </li> : ""}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {(localStorage.getItem('authToken')) ?
                                <li className="nav-but">
                                    <a className="btn btn-outline-light" aria-current="page" href='/profile'>My Profile</a>
                                    <a className="btn btn-outline-light" aria-current="page" href='/' onClick={handleLogout} >Logout</a>
                                </li> :
                                <li className="nav-but">
                                    <a className="btn btn-outline-light" aria-current="page" href="/signup">SignUp</a>
                                    <a className="btn btn-outline-light" aria-current="page" href="/login">Login</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
