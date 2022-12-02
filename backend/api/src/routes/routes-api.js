const router = require('express').Router();
const { stuff } = require('../controllers');




router.get('/apiKeyTest', stuff.apiKeyTest);
router.get('/mysqlTest', stuff.mysqlTest);
router.post('/regUser', stuff.regUser);
// router.post('/addBook', stuff.addBook);
/**
 * @api {post} /addBook Add Book
 * body {uid: String, book: String, totalPagesRead: Number, totalPages: Number, stateOfBook: String}
 * output {result: {n: 1, ok: 1, insertedCount: 1, insertedId: 632f4bbdbd4b4ea22db53b15}}
 * 
    */


module.exports = router;
