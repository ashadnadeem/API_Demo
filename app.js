const express = require('express');
const morgan = require('morgan');
const create_error = require('http-errors');
require('dotenv').config();

const Auth_Route = require('./Routes/auth.route');

const app = express();
app.use(morgan('dev'));

app.get('/', async(req, res, next) => {
    res.send('Hello World!');
});

// Auth Route
app.use('/auth', Auth_Route);

// Error Handler
app.use(async(req, res, next) => {
    next(create_error.NotFound("Not Found Error"));
});

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});


// Start Server to listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});