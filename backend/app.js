// const express = require('express')
// const cors = require('cors');
// const { db } = require('./db/db');
// const {readdirSync} = require('fs')
// const app = express()

// require('dotenv').config()

// const PORT = process.env.PORT

// //middlewares
// app.use(express.json())
// app.use(cors())

// //routes
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// const server = () => {
//     db()
//     app.listen(PORT, () => {
//         console.log('listening to port:', PORT)
//     })
// } 


// server()




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const notesRoutes = require('./routes/transactions');
const authRoutes = require('./routes/transactions');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // For parsing JSON request bodies

// Static Routes
app.use('/api/notes', notesRoutes); // Notes routes
app.use('/api/auth', authRoutes); // Auth routes

// Dynamic Routes (loading all routes in the 'routes' folder dynamically, except the already defined ones)
readdirSync('./routes').map((route) => {
    if (!['notesRoutes.js', 'authRoutes.js'].includes(route)) {
        app.use('/api/v1', require('./routes/' + route));
    }
});

// Server setup
const server = () => {
    db(); // Initialize the database connection
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
};

server();
