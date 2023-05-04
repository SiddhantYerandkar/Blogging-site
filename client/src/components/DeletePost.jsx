import axios from 'axios'
import React, { useState } from 'react'

const DeletePost = ({ postId, onDelete }) => {

    const [confirm, setConfirm] = useState(false)

    const token = localStorage.getItem('authToken')

    function handleDelete() {
        axios.delete(`http://localhost:3001/deletePost/${postId}`, {
            headers: {
                "x-api-key": token
            }
        })
            .then((response) => {
                console.log(response);
                setConfirm(false)
                onDelete(postId)
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message)
            })
    }

    return (
        <>
            {!confirm && (
                <button className="btn btn-danger" onClick={() => setConfirm(true)}>Delete</button>
            )}
            {confirm && (
                <>
                    <p>Are you sure you want to delete this post?</p>
                    <button className="btn btn-warning" onClick={handleDelete}>Yes</button>
                    <button className="btn btn-danger" onClick={() => setConfirm(false)}>No</button>
                </>
            )}
        </>
    )
}

export default DeletePost
