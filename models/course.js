const mangoose = require('mongoose');

const courseSchema = new mangoose.Schema({
    title: String,
    description: String,
    price: Number,
    duration: String,
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
    // cloudinary_id: String,
});

const CourseModel = mangoose.model('Course',courseSchema);
module.exports = CourseModel;