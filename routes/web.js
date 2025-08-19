const express = require('express');
const ContactController = require('../controllers/ContactController');
const TeacherController = require('../controllers/TeacherController');
const CourseController = require('../controllers/CourseController');
const UserController = require('../controllers/UserController');
const BookingController = require('../controllers/BookingController');
const router = express.Router();
const checkAuth = require('../middleware/auth');




//contact
router.get('/contact',ContactController.display); // Display contact page
router.post('/create',ContactController.create);
router.get('/view/:id',ContactController.view);
router.put('/update/:id',ContactController.update);
router.delete('/delete/:id',ContactController.delete);



//teacher
router.get('/teacher',TeacherController.display); // Display contact page
router.post('/teacherCreate',TeacherController.create);
// router.get('/viewteacher/:id',TeacherController.view);

//course
router.get('/course',CourseController.display); 
router.post('/course/create',CourseController.create);
router.get('/course/view/:id',CourseController.view);
router.put('/course/update/:id',CourseController.update);
router.delete('/course/delete/:id',CourseController.delete);


//User
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/profile',checkAuth, UserController.profile)
router.get('/logout',UserController.logout)

//booking 
router.post('/booking/create/:courseId',checkAuth,BookingController.createBooking)
router.get('/booking/mybookings', checkAuth, BookingController.getUserBookings)
router.get('/admin/bookings',checkAuth, BookingController.getAllBookings)



module.exports = router;