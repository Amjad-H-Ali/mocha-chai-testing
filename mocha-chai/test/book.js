process.env.NODE_ENV = "test";

const mongoose = require('mongoose');
const Book = require('../models/book');

// require are testing modules and our server
// our assertion lib
const chai = require('chai');
// this allows chai to make ajax requests
const chaiHttp = require('chai-http');
const server = require('../app')

// what kind of assertions do we want, should, expect, assert
const should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  // before we run each describe block empty the database
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });

  describe('/Get Books', () => {

    it('it should GET all the books', (done)  => {
      chai.request(server)
      .get('/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });// end of get book describe

  describe('/Post Book', () => {
    it('it should not POst a book without pages field', (done) => {
      // the object that we will send over
      const book = {
        title: 'Lord of the rings',
        author: 'Tolkien',
        year: 9200
      };

      chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('pages');
        res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      });
    });
      it('it should post a book', (done) => {
       const book = {
        title: 'Lord of the rings',
        author: 'Tolkien',
        year: 9200,
        pages: '1170'
      };

      chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('book successfully added!')
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('pages');
        res.body.book.should.have.property('year');
        done();
      });
  });






  });




}); // this is the end of descibe Books









