import loadRoutes, {constructAPIRoot} from './routes'
import Server from './server';
import config from '../config';

var assert = require('chai').assert;

describe("Test routes loader", () => {
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
	describe("URL API creation: ", () => {
        it("Creates an valid url API", () => {
            const path: string = constructAPIRoot('testapi','v1');
            assert.equal(path, "/testapi/v1");
        });       
    });	
    describe("Add the routes to the server: ", () => {
        it("The API router has been added to the server", () => {
            // Server creation
            const server: Server = new Server(config);
            // Loading the routes and applying them to the server
            loadRoutes(server);
            const router: any = server.app.router;
            const stack: Array<any> = router.stack;
            // Finding a layer with the name router which contains in its regexp the api substring
            const hasAPIRouter: Boolean = stack.some(layer => layer.name === 'router' && layer.regexp.toString().includes('api'));
            assert.isTrue(hasAPIRouter);
        });        
    });		
    
});