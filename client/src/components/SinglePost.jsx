import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/SinglePost.css'

const SinglePost = () => {

    const [post, setPost] = useState([])

    const { postId } = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/post/${postId}`)
            .then((response) => {
                console.log(response.data.data);
                setPost(response.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [postId])


    return (
        <>
            <div className="my-card card">
                <img src={post.image} className="card-img-fluid" alt={post.title} />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePost
