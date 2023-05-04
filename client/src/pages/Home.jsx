import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../styles/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/getPosts')
            .then((response) => {
                console.log(response.data);
                setBlogs(response.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (<>
        <div className="bg-info-subtle">
            <h1 className="mb-4">Latest Posts</h1>
            <div className='row'>
                {blogs.map(post => (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={post._id}>
                        <div className="card mb-5 shadow-sm">
                            <img src={post.image} className="card-img-top" alt={post.title} />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text post-content">{post.body}</p>
                                <Link className="btn btn-secondary" to={`/post/${post._id}`}>Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default Home
