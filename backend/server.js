const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema.js');
const SECRET_KEY = 'secretkey';

// connect to express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb://localhost:27017/userRegistrationDB';

mongoose.connect(dbURI)
    .then(() => {
        app.listen(3001, () => {
            console.log('Server is running on port 3001 and connected to MongoDB');
        });
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB', error);
    });


// middelware
app.use(bodyParser.json());
app.use(cors());



// routes
//USER REGISTRATION
//POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
})

// GET REGISTERED USERS
app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
})

// GET LOGIN
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid password' }); 
        }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({message: 'Login successful'});
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
})






// Create //Post Request
// Read  //Get Request
// Update //Put Request pr patch request
// Delete //Delete Request
