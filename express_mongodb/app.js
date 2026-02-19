require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('./config/passport'); 

const { connectDB, getDB } = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const protectedRoutes = require('./routes/protected.routes');

const app = express();
const PORT = 3000;

async function startServer() {
    try {
        await connectDB();
        console.log('Підключено до MongoDB');

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/auth', authRoutes);
        app.use('/protected', protectedRoutes);
        app.use('/users', userRoutes);

        app.get('/', (req, res) => {
            res.send('Hello ehaerh');
        });

        app.listen(PORT, () => {
            console.log(`Сервер запущено на порту: ${PORT}`);
        });

    } catch (err) {
        console.error('Помилка підключення:', err);
        process.exit(1);
    }
}

startServer();