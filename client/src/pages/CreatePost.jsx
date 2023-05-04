import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreatePost = (props) => {

    const [newBlog, setNewBlog] = useState({
        title: '',
        body: ''
    })
    const [file, setFile] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handlePost = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        console.log(typeof (localStorage.getItem('userId')));
    })

    const token = localStorage.getItem('authToken')

    function submitPost(e) {
        e.preventDefault()

        const formData = new FormData();
        const authorId = localStorage.getItem('userId')

        formData.append('image', file);
        formData.append('authorId', authorId);
        formData.append('title', newBlog.title)
        formData.append('body', newBlog.body)

        axios.post('http://localhost:3001/createPost', formData, {
            headers: {
                "x-api-key": token
            }
        })
            .then((response) => {
                console.log(response);
                alert(response.data.message)
                setNewBlog({
                    title: '',
                    body: ''
                })
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message)
            })
    }

    return (
        <form encType='multipart/form-data'>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name='title' value={newBlog.title} onChange={handlePost} />
            </div>
            <div className="form-group">
                <label>Content</label>
                <textarea className="form-control" name='body' value={newBlog.body} onChange={handlePost} rows="5"></textarea>
            </div>
            <div className="form-group">
                <label>Image URL</label>
                <input type="file" name='file' onChange={handleFileChange} className="form-control" />
            </div>
            <button type="submit" onClick={submitPost} className="btn btn-primary">Create</button>
        </form>
    )
}

export default CreatePost
