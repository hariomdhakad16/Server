const express = require('express');
// console.log(express);
require("dotenv").config();

const app = express();
const port = 3000;
const web = require('./routes/web');
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require("cors");


app.use(
    cors({
        origin: "https://coursebookinghariom.netlify.app", //your frontend domain
        credentials: true,    // allow credentials (cookies)
    })
);


//token get cookie
app.use(cookieParser())



//connectDB()
connectDB()
app.use(express.json())

//image upload
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));


// app.get('/', (req, res) => {               //routing
//   res.send('Hello World!')
// })


app.use('/api',web); //localhost:3000/api       path
app.listen(process.env.PORT,console.log('Server start localhost:3000'));