import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../styles/Profiles.css"
import { Link } from 'react-router-dom'
import DeletePost from '../components/DeletePost';

const Profiles = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        axios.get(`${process.env.REACT_APP_BASE_URL}/getPosts/${userId}`, {
            headers: {
                "x-api-key": localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                console.log(response.data);
                setUser(response.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function handleDeleted(deletedPostId) {
        setUser(user.filter((post) => post._id !== deletedPostId))
    }

    return (
        <div>
            <h1 className="mb-4">My Posts:{user}</h1>
            {
                (user.length === 0) ? <p className='lead'>You haven't posted anything. Your Post will be displayed here once you post something</p> :
                    user.map((post) => (
                        <ul key={post._id}>
                            <div className="my-card2 card mb-4" key={post.id}>
                                <img src={post.image} className="card-img-top" alt={post.title} />
                                <div className="card-body">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p className="card-text">{post.body}</p>
                                    <Link className="btn btn-primary" to={`/editPost/${post._id}`}>Edit</Link>
                                    <DeletePost postId={post._id} onDelete={handleDeleted} />
                                </div>
                            </div>
                        </ul>
                    ))
            }
        </div >
    )
}

export default Profiles
