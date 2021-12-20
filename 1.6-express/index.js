const express = require('express');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404);
  res.send({ status: 'error', message: `Route "${req.url}" is not found` });
});

app.listen(PORT);
