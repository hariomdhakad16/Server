const ContactModel = require('../models/contact')


class ContactController {

    static display = async (req, res) => {
        try {
            const data = await ContactModel.find()
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }
    static create = async (req, res) => {
        try {
            // console.log(req.body)
            const { name } = req.body
            const data = await ContactModel.create({
                name
            })
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static view = async (req, res) => {
        try {
            const id = req.params.id
            const data = await ContactModel.findById(id)
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static update = async (req, res) => {
        try {
            const id = req.params.id
            // console.log(id)
            const {name} = req.body
            const data = await ContactModel.findByIdAndUpdate(id,{
                name
            })
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static delete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await ContactModel.findByIdAndDelete(id)
            res.json({
                msg: "delete success"
            })
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = ContactController;