process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const Book = require('../models/book');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// This is the type of insertion we are using, we could also use assert or expect
const should = chai.should();

// allow us to make http requests to our server

chai.use(chaiHttp);



describe('Books API', () => {
	// Empty DB before each test
	beforeEach( done => {
		Book.remove({}, err => {
			done();
		});
	});

	describe('/Get Book', () => {
		it('it should get all the books', (done) => {
			chai.request(server)
			.get('/books')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);

				// when your done testing the important things
				done();
			});

		});
	}); //end of get

	describe('/POST Book', () => {

		it('it should not post a book without complete parameters', (done) => {
			const book = {
				title:'Cats',
				author: 'Kurty',
				year: 1950
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
			})
		});//end of fail post


		it('it should post a book', (done) => {
			const book = {
				title:'Hello',
				author: 'JK',
				year:1999,
				pages:350
			};

			chai.request(server)
			.post('/books')
			.send(book)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('book successfully added!');

				done();
			})
		})

	}); //end of post


}); //end of books api