const express = require('express');
const { v4: uuid } = require('uuid');

const PORT = process.env.PORT || 3000;
const app = express();

let books = require('./books.json');

app.use(express.json());

const send404 = (res) => {
  res.status(404);
  res.send({ status: 'error', message: 'There is no book with such an id!' });
}

app.post('/api/user/login', (__, res) => {
  res.status(201);
  res.send({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (__, res) => {
  res.send(books);
});

app.post('/api/books', (req, res) => {
  const { title, description, authors, favourite, fileCover, fileName } = req.body;
  const newBook = { id: uuid(), title, description, authors, favourite, fileCover, fileName };

  books.push(newBook);

  res.send(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favourite, fileCover, fileName } = req.body;

  const target = books.find(book => book.id === id);

  if (!target) {
    send404(res);

    return;
  }

  Object.assign(target, { title, description, authors, favourite, fileCover, fileName });
  res.send(target);
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const target = books.find(book => book.id === id);

  if (!target) {
    send404(res);

    return;
  }

  books = books.filter(book => book.id !== id);
  res.send({ status: 'ok' });
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;

  const target = books.find(book => book.id === id);

  if (target) {
    res.send(target);

    return;
  }

  send404(res);
});

app.listen(PORT);
