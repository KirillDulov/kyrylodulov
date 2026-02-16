require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
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
            secret: 'SECRET_KEY',
            resave: false,
            saveUninitialized: false,
            cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/auth', authRoutes);
        app.use('/protected', protectedRoutes);

        app.get('/', (req, res) => res.send('Сервер запущенно'));

        app.get('/users', async (req, res) => {
            try {
                const db = getDB();
                const documents = await db.collection('test').find({}).toArray();

                let html = `
                    <h1>Documents in 'test' collection</h1>
                    <ul>
                        ${documents.map(d => `<li>${JSON.stringify(d)}</li>`).join('')}
                    </ul>
                `;
                res.send(html);
            } catch (err) {
                console.error(err);
                res.status(500).send(`Внутрішня помилка сервера: ${err.message}`);
            }
        });

        app.use('/users', userRoutes);

        app.listen(PORT, () => console.log(`Сервер запущенно на порт: ${PORT}`));

    } catch (err) {
        console.error('Помилка підключення:', err);
        process.exit(1);
    }
}

startServer();