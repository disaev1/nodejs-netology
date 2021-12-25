const express = require('express');
const apiRoutes = require('./routes/api');
const booksViewRoutes = require('./routes/booksView');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/books', booksViewRoutes);

app.use((req, res) => {
  res.status(404);
  res.send({ status: 'error', message: `Route "${req.url}" is not found` });
});

app.listen(PORT);
