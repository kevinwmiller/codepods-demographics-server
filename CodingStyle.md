# Coding Style

## Documentation
### ApiDoc
[ApiDocJs](http://apidocjs.com/#getting-started)
- Used to document APIs. More to come

### ESDoc
- [EsDoc Documentation for React and ES6](http://en.blog.koba04.com/2015/06/28/esdoc-documentation-for-react-and-es6/)
- [EsDoc Usage](https://esdoc.org/manual/tags.html)
- To run documentation generators
    -     yarn doc

## Linting

- [Airbnb ES6 Coding Style](https://github.com/airbnb/javascript)
- [Airbnb React/Jsx Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- eslint
- To run the linter
-     yarn lint

### File Names
- Use camel case when creating files
#### Controllers
- Controllers must be placed in the src/controllers directory
- The filename should be {{type}}Controller.js
	- e.g. the Example controller file will be name 'exampleController.js'
#### Models
- Models must be placed in the src/models directory
- Models must be named {{type}}Model.js
	- e.g. the Example model file will be name 'exampleModel.js'
### Defining Routes
- Routes are defined in src/controllers/index.js
	-     router.use('/example', require('./exampleController'));
    - Routes should use the naming conventions described by [restfulapi.net](https://restfulapi.net/resource-naming/)
    - Routes should consist only of lowercase letters
	- The route name should be the name of the controller file without the 'Controller' suffix except when the controller name is a compound word. In this case, use a '-' to separate words
		- /average-income would be forwarded to src/controllers/averageIncomeController.js
		- /example is forwarded to src.controllers/exampleController.js
    - API routes indicate the type of resource to be accessed. The HTTP request method will be used to define the action
        - HTTP GET /example
            - Get all resources from /example
            - HTTP GET /example?queryParams may be used to filter results of all available resource data
        - HTTP POST /example
            - Create a new example resource
        - HTTP GET /example/{id}
            - Get a specific example resource
        - HTTP PATCH /example/{id}
            - Update a specific example resource
        - HTTP DELETE /example/{id}
            - Delete a specific example resource