const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createUser = async function (req, res) {
    try {
        let data = req.body
        const { name, email, password } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "body can't be empty" })

        if (!name) return res.status(400).send({ status: false, message: "name must not be empty" })

        if (!email) return res.status(400).send({ status: false, message: "email must not be empty" })

        const searchMail = await userModel.findOne({ email: email })
        if (searchMail) return res.status(400).send({ status: false, message: "email already registerd" })

        if (!password) return res.status(400).send({ status: false, message: "password must not be empty" })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        data.password = hashPassword

        const createData = await userModel.create(data)

        return res.status(201).send({ status: true, message: "successfully created" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const loginUser = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "body can't be empty" })

        const { email, password } = data

        if (!email) return res.status(400).send({ status: false, message: "email must not be empty" })

        if (!password) return res.status(400).send({ status: false, message: "password must not be empty" })

        let findUser = await userModel.findOne({ email: email })

        if (!findUser) return res.status(401).send({ status: false, msg: "email or password incorrect" });

        let hashPassword = findUser.password

        let result = await bcrypt.compare(password, hashPassword)
        if (!result) return res.status(400).send({ status: false, message: "Entered password is incorrect" })

        let token = jwt.sign(
            {
                userId: findUser._id.toString(),
                email: findUser.email,
            },
            "Mini-Blogging-Project"
        );

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, data: token });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { createUser, loginUser }