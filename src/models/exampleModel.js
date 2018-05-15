/**
    @exports ExampleModel
    @file Models handle calls to the database or to fetch data from APIs

    @typedef {Object} ExampleJsonObject
    @property {string} First The person's first name
    @property {string} Last The person's last name

 */

// Axios would be used if the model made an API call
// const axios = require('axios');

/** A 'database' that is accessed by the model
 Format is id: object
 The model would normally make a call to a real database or to an external API
 IDs in an external API may not be reliable, and we will likely not be able to create or modify data
*/
const fakeDatabase = {
    '5aa44da6b5a3087224a8029c': {
        _id: '5aa44da6b5a3087224a8029c',
        firstName: 'Andrews',
        lastName: 'Patel',
    },
    '5aa44da66499f9d153992f21': {
        _id: '5aa44da66499f9d153992f21',
        firstName: 'Conley',
        lastName: 'Lloyd',
    },
    '5aa44da685ecd7926bb96195': {
        _id: '5aa44da685ecd7926bb96195',
        firstName: 'Edwards',
        lastName: 'Mcintosh',
    },
    '5aa44da6b743c6f16d11f8c0': {
        _id: '5aa44da6b743c6f16d11f8c0',
        firstName: 'Brooke',
        lastName: 'Bailey',
    },
    '5aa44da6b2ce9d2d9757550e': {
        _id: '5aa44da6b2ce9d2d9757550e',
        firstName: 'Golden',
        lastName: 'Bailey',
    },
    '5aa44da6efc0456f63a80bab': {
        _id: '5aa44da6efc0456f63a80bab',
        firstName: 'Claudette',
        lastName: 'Leblanc',
    },
};

/** Note: The parameters given here are only an example and will change depending on the functionality of the model
    Thrown exception messages may also vary between models as needed
*/
/**
    The model would make an api request using axios or a database request if no api is available
    The create method should create a data store record with the given parameters
    If creating a new record is not an available option, e.g. an external API request,
    the create method should throw an exception
    @returns {ExampleJsonObject} The new ExampleModel data
    @throws Will throw an error if the method is used
*/
exports.create = async () => {
    console.log('ExampleModel create');
    throw new Error('ExampleModel does not support "create"');
};


/**
    The model would make an api request using axios or a database request if no api is available
    The getAll method returns data that matches the given constraints
    @returns {ExampleJsonObject|Array} An array ExampleJsonObject data
*/
exports.getAll = async (query) => {
    console.log('ExampleModel getAll');
    /** Get all resouce data of the model type from the database or api
     If we were accessing a real database or an api, we could easily pass our constraints to it to handle the filtering
     However, since we only have an object here, we can manually filter our data
    */
    const exampleData = Object.values(fakeDatabase);
    // Filter our array to only those object that match every constraint passed in the query
    return exampleData.filter((example) => {
        // Not sure of the one-liner method to do this yet
        let matchesConstraints = true;
        matchesConstraints = Object.keys(query).every((queryKey) => {
            if (!(queryKey in example) || example[queryKey] !== query[queryKey]) {
                return false;
            }
            return true;
        });
        return matchesConstraints;
    });
};

/**
    The model would make an api request using axios or a database request if no api is available
    The get method returns data that matches the given constraints
    @returns {ExampleJsonObject|Array} An array ExampleJsonObject data
*/
exports.get = async (id) => {
    console.log('ExampleModel get');
    if (id in fakeDatabase) {
        return fakeDatabase[id];
    }
    throw new Error(`Could not find object with ID ${id}`);
};


/**
    The model would make an api request using axios or a database request if no api is available
    The edit method will edit an existing data store record with the given parameters
    @returns {ExampleJsonObject} The new ExampleModel data
    @throws Will throw an error if the method is used.
*/
exports.update = async () => {
    console.log('ExampleModel edit');
    throw new Error('ExampleModel does not support "update"');
};

/**
    The model would make an api request using axios or a database request if no api is available
    The delete method will edit an existing data store record with the given parameters
    @returns {undefined}
    @throws Will throw an error if the method is used
*/
exports.delete = async () => {
    console.log('ExampleModel delete');
    throw new Error('ExampleModel does not support "delete"');
};
