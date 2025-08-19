const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Make sure Course model is exported as "Course"
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Make sure User model is exported as "User", not "user"
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"], // fixed "COnfirmed" typo
      default: "Confirmed",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
