const express = require('express');
const path = require('path');

const usersRoutes = require('./routes/users.routes');
const articlesRoutes = require('./routes/articles.routes');

const log = require('./middlewares/log.middleware');
const errorHandler = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cookieParser());

app.use(log);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

app.get('/', (req, res) => {
    res.send('Get root route');
});

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});