import config from './index'

var assert = require('chai').assert;

describe("Test config parameters", function() {
	before(function() {
		// runs before all tests in this block
	});
	after(function() {
		// runs after all tests in this block
	});
	beforeEach(function() {
		// runs before each test in this block
    });
    afterEach(function() {
	   // runs after each test in this block
	});
	describe("Check node parameters : ", function() {
        it("Check default port is 3000 if proces.env.PORT has not been defined", function() {
            if(!process.env.PORT) {
                const port = config.node.port;
                assert.equal(port, 3000);
            }

        });
        it("Check that the port defined in process.env is used if it has been defined", function() {
            if(process.env.PORT) {
                const port = config.node.port;
                assert.equal(port, process.env.PORT);
            }
        });
    });		
    describe("Check api parameters : ", function() {
        it("Check that api has prefix and version", function() {
            const api = config.api;
            assert.hasAllKeys(api, ['prefix', 'version']);

        });
	});		
});