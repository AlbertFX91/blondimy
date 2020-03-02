import createServer from '../../../src/loaders/index'

import chai from 'chai';
var assert = chai.assert;
var expect = chai.expect;

describe("Test main loader", () => {
	before(() => {
        // runs before all tests in this block
	});
	after(() => {
		// runs after all tests in this block
	});
	beforeEach(() => {
		// runs before each test in this block
    });
    afterEach(() => {
       // runs after each test in this block
	});
	describe("Creates the full server application: ", () => {
        it("Return a promise with a server", async () => {
            const promise = createServer();
            assert.typeOf(promise, 'Promise');
            return promise.then((server: any) => {
                return server.close();
            })
        });
        it("Returns a Server object", async () => {
            return createServer()
                .then((server: any) => {
                    assert.isNotNull(server.app);
                    assert.isNotNull(server.port);
                    var p = server.close();
                    return p;
                });
        });
    });		
});