import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditPost = (props) => {

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
    const { postId } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/post/${postId}`)
            .then((response) => {
                console.log(response.data.data)
                setNewBlog({ title: response.data.data.title, body: response.data.data.body })
                setFile(response.data.data.image)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [postId])

    const token = localStorage.getItem('authToken')
    let navigate = useNavigate()

    function submitPost(e) {
        e.preventDefault()

        const formData = new FormData();
        const authorId = localStorage.getItem('userId')

        formData.append('image', file);
        formData.append('authorId', authorId);
        formData.append('title', newBlog.title)
        formData.append('body', newBlog.body)

        axios.put(`http://localhost:3001/editPost/${postId}`, formData, {
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
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message)
            })
    }

    function cancelEdit() {
        navigate('/profile')
    }

    return (
        <form encType='multipart/form-data'>
            <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" name='title' value={newBlog.title} onChange={handlePost} />
            </div>
            <div className="form-group">
                <label>Body:</label>
                <textarea className="form-control" name='body' value={newBlog.body} onChange={handlePost} rows="5"></textarea>
            </div>
            <div className="form-group">
                <label>Image URL:</label>
                <input type="file" name='file' onChange={handleFileChange} className="form-control" />
            </div>
            <button type="submit" onClick={submitPost} className="btn btn-primary">submit</button>
            <button type="submit" onClick={cancelEdit} className="btn btn-danger">cancel</button>
        </form>
    )
}

export default EditPost
