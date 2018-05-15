# Development Notes
#### [Back to readme](README.md)
## Axios and Promises
- Backend and web querying are done using axios
- Axios can be imported in a client component using the import command
  -     import axios from 'axios'
- To import Axios into the express backend
  -     const axios = require('axios')

- Axios provides different methods to query a web page with different protocols
  - Get request
    -     axios.get('{{url}}')
  - Post request
    -     axios.post('{{url}}', {{objectToPost}})
- Axios http request functions return a "Promise" object
  - Promise objects represent the eventual success or failure of an asynchronous operation
  - In order to handle promise objects, the async/await paradigm can be used
    - An async function is declared by prefixing a function declaration with the prefix 'async'
    ```javascript
    arrowAsyncFunction = async () => {
            try {
              const response = await this.returnsPromiseObject()
                // Do something with response.data
            } catch (err) {
                // Do something with err or err.message
            }
        }
    ```
    ```javascript
    onArrowAsyncFunction = async function() {
            try {
              const response = await this.returnsPromiseObject()
                // Do something with response.data
            } catch (err) {
                // Do something with err or err.message
            }
        }
    ```
  - The two functions above are essentially the same. There are slight differences between arrow and non-arrow functions in javascript, but I'll defer that to [another arrow function tutorial](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
          - The differences mainly lie in how 'this' is scoped. It shouldn't be much of an issue, but tend to prefer arrow functions when possible
        -  The async marker on the function declares the function as asynchronous. The asynchronous function will call another function that runs asynchronously that returns a promise object. The call to this other asynchronous function is prefixed with "await". This means the code following our call to the async function will not run until the async function has returned successfully. This keeps our code clean and makes our asynchronous code look synchronous.
        -  On success, the promise object returns a response containing a data property
          -     console.log(response.data)
        -  If the asynchronous function fails, the promise will throw an exception. This is why the async code is wrapped in a try/catch block. The exception providesan  err object containing a message property that describes what went wrong
          -  The error can be displayed in the console or returned from the function
              -     console.log(err.message)
## Express
### Folder Structure
#### docs/
- Contains Code and API documentation
#### src/
##### controllers/
- Controllers handle request validation and authentication
- If the user has adequate credentials, the controller will pass the provided input to the appropriate model and return the data returned from the model
- The response should be formatted as json with a top-level key of 'response'
- Controllers should not do any data manipulation
- Creating a route example:
```javascript
/**
    Creates a route for /example
    @returns {object} @see {@link ExampleModel}
*/
router.get('/', async (req, res) => {
    try {
        res.json({ response: await exampleModel.read(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});
```
- See src/controllers/exampleController.js
- See [coding style document](CodingStyle.md) for information on defining routes
##### models/
- Models fetch and convert data from the appropriate API or database and convert it to an easy to use format if needed
- Return value of a model should be a json object
- Format to be decided later, but can differ between models as needed
- Models should contain methods to perform CRUD (Create, Read, Update, Delete) operations
	- A model may contain a read method only if the data is not to be or cannot be maniuplated in the data store (e.g. an external api request)
##### test/
##### controllers/
- Test that the controllers route to the expected models and return data with a response top-level key
- Test that protected routes are only available if the user has the correct credentials (ApiKey in the future?)
##### models/
- Test that models return expected data given the test parameters passed to it
### Error Handling
- Exceptions should be used if an error occurs. The error should contain a descriptive message of what went wrong
	- Example:
	```javascript
	throw new Error(`ExampleModel does not support "delete"`);
	```

## General Notes
- To exit vagrant ssh. Run the following from your command prompt
  -   exit or ctrl+D
- To stop the virtual machine
  -   vagrant halt
- To destroy the virtual machine
  -   vagrant destroy
- If testing a new branch, run "git checkout {{BranchName}}" and install project dependencies
	- If on a Linux host machine
		-     yarn
	- If on a Windows host machine
		-     yarn --no-bin-links
