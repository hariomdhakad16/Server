const CourseModel = require('../models/course')
const cloudinary = require('cloudinary')

// Configuration
    cloudinary.config({ 
        cloud_name: 'dpnlzmeii', 
        api_key: '312972351377119', 
        api_secret: 'dia-WW1eS90uStkNXo2_jKLfyNA' // Click 'View API Keys' above to copy your API secret
    });

class CourseController {

    static display = async (req, res) => {
        try {
            const data = await CourseModel.find()
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }
    static create = async (req, res) => {
        try {
            // console.log(req.files)
            const { title,description,price,duration }  = req.body
            const file = req.files.image
            // console.log(file)

            const imageupload = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'PnInfosys_slider'
            }
        )

        // console.log(imageupload)

            const data = await CourseModel.create({
                title,
                description,
                price,
                duration,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            })
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static view = async (req, res) => {
        try {
            const id = req.params.id
            const data = await CourseModel.findById(id)
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static update = async (req, res) => {
        try {
            const id = req.params.id
            // console.log(id)
            const { title,description,price,duration }  = req.body
            const data = await CourseModel.findByIdAndUpdate(id,{
                title,
                description,
                price,
                duration
            })
            res.json(data)
        } catch (error) {
            console.log(error);
        }

    }

    static delete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await CourseModel.findByIdAndDelete(id)
            res.json({
                msg: "delete success"
            })
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = CourseController;