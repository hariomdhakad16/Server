const BookingModel = require('../models/Booking')  //Booking model
const Course = require('../models/course')    // course model

class BookingController {
    // static arrow function to create booking

    static createBooking = async (req, res) => {
        try {
            console.log(req.body)
            const { courseId } = req.params;
            // console.log('courseID',courseId)
            const userId = req.user._id;
            // console.log('userID',userId)
            const course = await Course.findById(courseId);
            // console.log(course)
            console.log("this is ths data of ", course)

            if(!course) {
                return res.status(404).json({ message: "Course not found"});
            }


            const newBooking = await BookingModel.create({
                course: course._id,
                user: userId,
                price: course.price,


            });

            return res.status(201).json({
                message: "Booking created successfully",
                booking: newBooking,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    };

    // static arrow function to get user bookings

    static getUserBookings = async(req, res) => {
        try {
            const userId = req.user._id;
            const data = await BookingModel.find({ user: userId})
            .populate("course", "title price")
            .sort({ createdAt: -1});

            return res.status(200).json({data});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error"});
        }
    };

    static cancelBooking = async (req, res) => {
        try{
            const { bookingId } = req.params;
            const booking = await BookingModel.findByIdAndUpdate(
                bookingId,
                { status: "Cancelled"},
                { new: true}
            );

            if(!booking) {
                return res.status(404).json({ message: "Booking not found "});
            }

            return res.status(200).json({
                message: "Booking cancelled successfully",
                booking,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error 1" });
        }
    };

    static getAllBookings = async (req, res) => {
        try {
            const bookings = await BookingModel.find()
            .populate("user", "name email") //user ka name and email
            .populate("course", "title price") // course ka title and price
            .sort({ createdAt: -1});

            //Format response
            const formatted = bookings.map(b => ({
                _id: b._id,
                userName: b.user.name,
                userEmail: b.user.email,
                courseTitle: b.course.title,
                price: b.course.price,
                status: b.status,
                createdAt: b.createdAt
            }));

            res.status(200).json(formatted);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error2 "});
        }
    };
}

module.exports = BookingController;