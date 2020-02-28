import createServer from './index'

var assert = require('chai').assert;

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
        it("Return a promise with a server", () => {
            const promise = createServer();
            assert.typeOf(promise, 'Promise');
        });
        it("Returns a Server object", (done) => {
            createServer()
                .then((server) => {
                    assert.hasAllKeys(server, ['app', 'port']);
                    done();
                });
        });        
    });		
    
});