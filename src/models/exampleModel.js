/**
    @exports ExampleModel
    @file Models handle calls to the database or to fetch data from APIs

    @typedef {Object} ExampleJsonObject
    @property {string} First The person's first name
    @property {string} Last The person's last name

 */

// Axios would be used if the model made an API call
// const axios = require('axios');

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
    The read method returns data that matches the given constraints
    @returns {ExampleJsonObject|Array} An array ExampleJsonObject data
*/
exports.read = async (firstName, lastName) => {
    console.log('ExampleModel read');
    return [
        { firstName, lastName },
        { firstName: 'John', lastName: 'Doe' },
    ];
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
