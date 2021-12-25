const upload = require('./multer');
const bookFileFields = ['fileCover', 'fileName', 'fileBook'];

const uploadBookFileFields = upload.fields(bookFileFields.map(field => ({ name: field, maxCount: 1 })));

module.exports = { uploadBookFileFields };
