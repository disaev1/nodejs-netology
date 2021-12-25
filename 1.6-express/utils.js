const bookFields = ['title', 'description', 'authors', 'favourite'];

function parseBookDataFromReq(req) {
  const res = _.pick(req.body, bookFields);

  // In form data "authors" field is a JSON string, it is not automatically parsed
  if ('authors' in res && typeof res.authors === 'string') {
    res.authors = JSON.parse(res.authors);
  }

  if (req.files) {
    bookFileFields.forEach(field => {
      console.log('consider field', field, req.files[field]?.filename);
      if (req.files[field]) {
        console.log('data is', req.files[field]);
        res[field] = req.files[field][0].filename;
      }
    });
  }
  console.log('file is', req.file, 'files are', req.files, 'res is', res);

  return res;
}

module.exports = { parseBookDataFromReq };
