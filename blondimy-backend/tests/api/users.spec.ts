
import chai from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../src/loaders/index'
import server from '../../src/loaders/server'

import DatabaseUtils from '../../src/utils/databaseUtils'

chai.use(chaiHttp);
var expect = chai.expect;

describe("(/users) User entrypoint", function() {
	before(function() {
        // runs before all tests in this block
        return createServer()
                .then( s => s.listen());
	});
	after(function() {
        // runs after all tests in this block
        return server.close();
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
        it("It must return my id, username, creationDate and a token access", function() {
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
                    expect(body).to.have.property('creationDate');
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It cannot create an user with an username used", function () {
            const username = 'example_user';
            const password = 'example_password';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(() => chai.request('http://localhost:3000')
                        .post('/api/v1/users')
                        .send({ username: username, password: password })
                )
                .then((res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.message).to.equal('Duplicated value');
                });
        });
        it("It cannot create an user without password", function () {
            const username = 'example_user';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username})
                .then(res => {
                    expect(res).to.have.status(422);
                    expect(res).to.be.json;
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It cannot create an user with an username with less than 5 characters", function () {
            const username = 'lil';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username})
                .then(res => {
                    expect(res).to.have.status(422);
                    expect(res).to.be.json;
                    expect(res.body.message).to.deep.include.members([{ msg: 'Invalid value', param: 'password', location: 'body' }]);
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
    });	
    describe("(GET /users/me) Recover my user:", function() {
        it("It must return my id, username and my creationDate", function() {
            const username = 'example_user';
            const password = 'example_password';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    return res.body.token
                })
                .then(token => chai.request('http://localhost:3000')
                        .get('/api/v1/users/me')
                        .set('authorization', `BEARED ${token}`)
                        .send()
                ).then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    const body = res.body;
                    expect(body.username).to.equal(username);
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('creationDate');
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It must return an 401 if I am not logged ", function() {
            return chai.request('http://localhost:3000')
                .get('/api/v1/users/me')
                .send()
                .then(res => {
                    expect(res).to.have.status(401);
                    expect(res).to.be.json;
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It must return an 'Authentication error' if my token is wrong", function() {
            return chai.request('http://localhost:3000')
                .get('/api/v1/users/me')
                .set('authorization', `BEARED WRONG`)
                .send()
                .then(res => {
                    expect(res).to.have.status(401);
                    expect(res).to.be.json;
                    expect(res.body.message).to.be.equal('Authentication error');
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
    });	
    describe("(DELETE /users/me) Delete my user:", function() {
        it("It must 200", function() {
            const username = 'example_user';
            const password = 'example_password';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    return res.body.token
                })
                .then(token => chai.request('http://localhost:3000')
                        .delete('/api/v1/users/me')
                        .set('authorization', `BEARED ${token}`)
                        .send()
                ).then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    const body = res.body;
                    expect(body.username).to.equal(username);
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('creationDate');
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It must return an 422 if I am not logged ", function() {
            return chai.request('http://localhost:3000')
                .delete('/api/v1/users/me')
                .send()
                .then(res => {
                    expect(res).to.have.status(401);
                    expect(res).to.be.json;
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It must return an 'Authentication error' if my token is wrong", function() {
            return chai.request('http://localhost:3000')
                .delete('/api/v1/users/me')
                .set('authorization', `BEARED WRONG`)
                .send()
                .then(res => {
                    expect(res).to.have.status(401);
                    expect(res).to.be.json;
                    expect(res.body.message).to.be.equal('Authentication error');
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
        it("It must return 200 and an empty object if I remove my user twice", function() {
            const username = 'example_user';
            const password = 'example_password';
            let mytoken = '';
            return chai.request('http://localhost:3000')
                .post('/api/v1/users')
                .send({ username: username, password: password })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    return res.body.token
                })
                .then(token => {
                    mytoken = token;
                    return chai.request('http://localhost:3000')
                        .delete('/api/v1/users/me')
                        .set('authorization', `BEARED ${token}`)
                        .send()
                })
                .then(res => {
                    return chai.request('http://localhost:3000')
                    .delete('/api/v1/users/me')
                    .set('authorization', `BEARED ${mytoken}`)
                    .send()
                })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    return res.body.token
                })
                .catch(err => {
                    console.error(err);
                    throw err;
                });
        });
    });	
});