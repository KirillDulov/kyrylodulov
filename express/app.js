const express = require('express');
const path = require('path');

const usersRoutes = require('./routes/users.routes');
const articlesRoutes = require('./routes/articles.routes');

const log = require('./middlewares/log.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(log);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('Get root route');
});

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});