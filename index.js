const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/env');


mongoose.connect(config.database.name, { useNewUrlParser: true });
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ' + config.database.name);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});
const app = express();


//Routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const registration = require('./routes/registration');
const college = require('./routes/college');
//Routes

//Running Port
const port = 3000;

// CORS Middleware
app.use(cors({ origin: 'http://localhost:4200' }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);





//Routes Starts
app.use('/users', users);
app.use('/registration', registration);
app.use('/auth',auth);
app.use('/college',college);
//Routes Ends







// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});