const express = require('express');
require("dotenv").config();

const app = express();
const web = require('./routes/web');
const connectDB = require('./db/connectDB');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require("cors");

// ✅ Fix: remove trailing slash + allow methods + headers
app.use(
  cors({
    origin: "https://coursebooking43.netlify.app", // no trailing slash
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies
  })
);

// token get cookie
app.use(cookieParser());

// connect to DB
connectDB();
app.use(express.json());

// image upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use('/api', web);

// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
