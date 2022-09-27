const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// const bcrypt = require('bcrypt');
// bcrypt.config(); 

//parse JSON data coming in the request body
app.use(express.json());

//gain access to my routes
app.use('/members', require('./routes/member'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));