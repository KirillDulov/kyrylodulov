const express = require('express');

const usersRoutes = require('./routes/users.routes');
const articlesRoutes = require('./routes/articles.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Get root route');
});

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});