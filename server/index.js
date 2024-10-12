import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { getData } from "./controllers/getTestData.js";
import userRoutes from './routes/userRoutes.js';


// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// File Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });



// MongoDB Connection Setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch(error => console.log(`${error} did not connect`));



let storedProfileData = {}; // Declare a global variable to store profile data

//const { getData } = require('./controllers/dataController');

//app.get('/getTestData', getData); // This will serve the stored profile data

app.post('/api/profile', (req, res) => {
    storedProfileData = req.body;
    console.log('Received profile data:', storedProfileData);
  
     // Send a success response
    res.status(200).json({
        message: 'Profile data received successfully',
        profileData: storedProfileData // Send the profile data back in the response
    });
  });

  app.use('/api/users', userRoutes);

