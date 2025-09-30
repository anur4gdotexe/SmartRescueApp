require('dotenv').config();
const {connectDB} = require('./config/db');

//connecting to the database
connectDB();

const shelterRoutes = require('./routes/shelters');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use("/shelters", shelterRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));