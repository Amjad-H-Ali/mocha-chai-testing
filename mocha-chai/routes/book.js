const express = require('express');
const router = express.Router();
const Book   = require('../models/book')



router.route('/:id')
    .get(function(req, res){
      Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err)

          res.json(book)
      })
    })
    .delete(function(req, res){
      Book.remove({_id: req.params.id}, (err, result) => {
        res.json({ message: "Book was deleted", result})
      })
    })
    .put(function(req, res){
      Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err);
        //object assign overides the common properties of the
        // the book with req.body

        // In the function updatedBook()
        // we use Object.assign,
        // a new function introduced in ES6 which, in this case, overrides
        // the common properties of book with req.body
        // while leaving untouched the others.
        Object.assign(book, req.body).save((err, book) => {
          if(err) res.send(err)

            res.json({ message: "book updated!", book})
        })

      })
    })











router.route('/')
    .get(function(req, res){

      let query = Book.find();
      query.exec((err, books) => {
        if(err) res.send(err)

        res.json(books)
      })
    }
   )
  .post(function(req, res){

    var newBook = new Book(req.body)

    newBook.save((err, book) => {
      if(err) {
        res.send(err)
      }
      else{
        res.json({message: "book successfully added!", book})
      }
    })
  })













module.exports = router;
