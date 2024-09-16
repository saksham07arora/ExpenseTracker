const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const authConfig = require('./routes/authConfig');

require('dotenv').config()


const app = express();
app.use(bodyParser.json());

app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);
// const app = express()



const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())


const cca = new ConfidentialClientApplication({
  auth: authConfig.auth,
});

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const result = await cca.acquireTokenByClientCredential({
    //   scopes: [''], 
    });
    
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { checkToken };

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
} 

server()

// const express = require('express');
// const morgan = require('morgan');
// const jwtVerifyMiddleware = require('./verifyToken');
// const notesRoutes = require('./routes/notesRoutes');
// const authRoutes = require('./routes/authRoutes');
// require('dotenv').config();



// const app = express();
// app.use(bodyParser.json());

// app.use('/api/notes', notesRoutes);
// app.use('/api/auth', authRoutes);
// app.use(morgan('dev'));
// app.use(express.json());

// app.get('/api/userinfo', jwtVerifyMiddleware, (req, res) => {
//     res.json({ message: 'User info', user: req.user });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });