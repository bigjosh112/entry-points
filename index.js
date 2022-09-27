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

mongoose.connect(process.env.MONGO_URI_LOCAL)
const con = mongoose.connection;
// handle error when opening db
con.on('open', error => {
if(!error)
console.log('DB Connection Successful');
else{
    console.log(`Error Connecting to DB: ${error}`);
}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));