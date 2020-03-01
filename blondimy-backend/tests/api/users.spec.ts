
import chai from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../src/loaders/index'

import DatabaseUtils from '../../src/utils/databaseUtils'

chai.use(chaiHttp);
var expect = chai.expect;

describe("(/users) User entrypoint", function() {
	before(function(done) {
        // runs before all tests in this block
        createServer()
            .then( server => {
                server.listen();
                done();
            })
	});
	after(function() {
		// runs after all tests in this block
	});
	beforeEach(function() {
        // runs before each test in this block
        return DatabaseUtils.drop();
    });
    afterEach(function() {
	    // runs after each test in this block
        return DatabaseUtils.drop();
	});
	describe("(POST /users) Register a user:", function() {
        it("It must return my id, username and a token access", function() {
            const username = 'example_user';
            const password = 'example_password';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    const body = res.body;
                    expect(body.username).to.equal(username);
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('token');
                })
                .catch(err => {
                    console.error(err);
                    throw err; // Re-throw the error if the test should fail when an error happens
                });
        });
        it("It cannot create an user with an username used", function () {
            console.log("TEST 1");
            const username = 'example_user';
            const password = 'example_password';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(res => {
                    console.log("TEST 2");
                    console.log(res.body);
                    /*
                    return chai.request('http://localhost:3000')
                        .post('/api/v1/users')
                        .send({ username: username, password: password })
                    */
                })
                .then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
                .then(() => chai.request('http://localhost:3000')
                        .post('/api/v1/users')
                        .send({ username: username, password: password })
                )
                .then((res) => {
                    console.log("TEST 3");
                    console.log(res.body);
                    expect(res).to.have.status(422);
                    expect(res.body.message).to.equal('Duplicated value');
                });
                /*
                .then(res => {
                    console.log(res.body);
                    return chai.request('http://localhost:3000')
                        .post('/api/v1/users')
                        .send({ username: username, password: password })
                        .then((res) => {
                            expect(res).to.have.status(422);
                            expect(res.body.message).to.equal('Duplicated value');
                        });
                });
                */

        });
    });			
});