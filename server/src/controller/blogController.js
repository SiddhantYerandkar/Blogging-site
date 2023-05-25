const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const cloudinary = require('../controller/cloudinary')

const createBlog = async function (req, res) {
    try {
        let data = req.body;
        let { title, body, authorId } = data;

        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, msg: "data Not Found" });
        }
        if (!title) {
            return res.status(400).send({ status: false, msg: "title is required" });
        }
        if (!body) {
            return res.status(400).send({ status: false, msg: "body is required" });
        }
        if (!authorId) return res.status(400).send({ status: false, msg: "authorId is required" })

        let image = req.files
        if (image == undefined || image.length == 0) return res.status(400).send({ status: false, message: "Please provide a Blog image" })

        if (image.length == 1) {
            if (image[0].mimetype.split('/')[0] != 'image') {
                return res.status(400).send({ status: false, message: "Provide a jpeg or png file" })
            }
            let imageLink = await cloudinary.uploadFile(image[0])
            data.image = imageLink
        }

        const Blog = await blogModel.create(data);
        return res.status(201).send({ status: true, data: Blog, message: "Blog created successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const viewPosts = async function (req, res) {
    try {
        const blogData = await blogModel.find({ isDeleted: false })

        return res.status(200).send({ status: true, data: blogData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const editPost = async function (req, res) {
    try {
        let postData = req.body
        let { title, body } = postData

        if (Object.keys(postData).length == 0) return res.status(400).send({ status: false, msg: "Data not found in body" });

        let postId = req.params.postId;

        let blogs = await blogModel.findById(postId);
        if (!blogs) return res.status(404).send({ status: false, msg: "Blogs not found" });

        let authorId = blogs.authorId;
        if (authorId != req.decoded.userId) return res.status(403).send({ status: false, msg: "you dont have access" });

        let updatedBlog = await blogModel.findOneAndUpdate(
            { _id: postId },
            {
                title: title,
                body: body,
            },
            { new: true }
        );
        if (updatedBlog.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "blog not found" });
        }
        return res.status(200).send({
            status: true,
            data: updatedBlog,
            message: "blog updated successfully",
        });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deletePost = async function (req, res) {
    try {
        let blogId = req.params.postId;

        let posts = await blogModel.findById(blogId);
        if (!posts) return res.status(404).send({ status: false, msg: "Blogs not found" });

        let authorId = posts.authorId;
        if (authorId != req.decoded.userId) return res.status(403).send({ status: false, msg: "you dont have access" });

        let updatedBlog = await blogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },
            {
                $set: {
                    isDeleted: true
                },
            },
            { new: true }
        );
        if (!updatedBlog) return res.status(404).send({ status: false, msg: "blog document doesn't exist" });

        return res.status(200).send({ status: true, data: {} });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getPostsById = async function (req, res) {
    try {
        let userId = req.params.userId

        if (userId != req.decoded.userId) return res.status(403).send({ status: false, msg: "you dont have access" });

        const getData = await blogModel.find({ authorId: userId, isDeleted: false })

        return res.status(200).send({ status: true, data: getData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getPostsbyPostId = async function (req, res) {
    try {
        let postId = req.params.postId

        const getData = await blogModel.findById({ _id: postId })

        return res.status(200).send({ status: true, data: getData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createBlog, viewPosts, editPost, deletePost, getPostsById, getPostsbyPostId }