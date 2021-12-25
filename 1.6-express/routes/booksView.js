const express = require('express');
const { NotFoundError } = require('../errors');
const { uploadBookFileFields } = require('../middleware');

const router = express.Router();

let books = require('../books.json'); // TODO: No commit
// let books = []; // TODO: Uncomment and commit

router.get('/', (__, res) => {
  res.render('books/index', { title: 'Главная', books });
});

router.get('/create', (__, res) => {
  res.render('books/create', { title: 'Добавить книгу', book: {} });
});

router.post('/create', uploadBookFileFields, (req, res) => {
  const newBook = parseBookDataFromReq(req);
  books.push(newBook);
  console.log('newBook is', newBook);

  res.redirect('/');
});

router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const target = books.find(book => book.id === id);

  if (target) {
    res.render('books/create', { title: 'Редактировать книгу', book: target });

    return;
  }

  throw new NotFoundError(`There is no book with id = ${id}!`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const target = books.find(book => book.id === id);

  if (target) {
    res.render('books/view', { title: 'Информация о книге', book: target });

    return;
  }

  throw new NotFoundError(`There is no book with id = ${id}!`);
});

router.use((err, __, res, ___) => {
  if (err instanceof NotFoundError) {
    return res.render('not-found');
  }
  
  res.status(500).send({ status: 'error', message: err.message });
});

module.exports = router;
