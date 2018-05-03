/**
    @exports CommuteModel
    @file Models handle calls to the database or to fetch data from APIs

    @typedef {Object} CommuteJsonObject
    @property {string} First The person's first name
    @property {string} Last The person's last name

 */

// Axios would be used if the model made an API call
// const axios = require('axios');


//Debug messages to console
var turnOnDebug=1;
function consoleDebug(msg)
{
    if (turnOnDebug==1) console.log('>> '+msg);
};


//CacheCommuteData Global Vars and Function
var commuteDataLoaded=0;
var commuteDictionary={};
function cacheCommuteData() {
    if (commuteDataLoaded==0)
    {
        console.log('Setup: Caching commuteDictionary');
        commuteDataLoaded=1;
        var commuteDataJSON = require ('./commuteData.json');

        //Build a dictionary with zip as key and commute as value
        consoleDebug('Build Dictionary from json');
        for (i=0; i<commuteDataJSON.length; i++){
            consoleDebug(commuteDataJSON[i]["zip_code"] + ' ' + commuteDataJSON[i]["commute_time_mins_est"]);
            commuteDictionary[commuteDataJSON[i]["zip_code"]] = commuteDataJSON[i]["commute_time_mins_est"];
        };
    }

};

//return Json strign version of commute Object
function commuteJSON(zipCode)
{   
    var numZip = Number(zipCode).toString(); 
    var paddedZip = numZip.padStart(5, "0")      
    if (numZip in commuteDictionary)
        return { "_id" : paddedZip, "zipCode":  paddedZip,  "commuteTime" : commuteDictionary[numZip] };

    throw new Error(`Could not find object with zipCode ${paddedZip}`);
};

function commuteJSONExists(zipCode)
{            
    var numZip = Number(zipCode).toString(); 
    if (numZip in commuteDictionary)
        return true;

    return false;
};


/** Note: The parameters given here are only an commute and will change depending on the functionality of the model
    Thrown exception messages may also vary between models as needed
*/
/**
    The model would make an api request using axios or a database request if no api is available
    The create method should create a data store record with the given parameters
    If creating a new record is not an available option, e.g. an external API request,
    the create method should throw an exception
    @returns {CommuteJsonObject} The new CommuteModel data
    @throws Will throw an error if the method is used
*/
exports.create = async () => {
    console.log('CommuteModel create');
    throw new Error('CommuteModel does not support "create"');
};


/**
    The model would make an api request using axios or a database request if no api is available
    The getAll method returns data that matches the given constraints
    @returns {CommuteJsonObject|Array} An array CommuteJsonObject data
*/
exports.getAll = async (query) => {
    console.log('CommuteModel getAll');
    /** Get all resouce data of the model type from the database or api
     If we were accessing a real database or an api, we could easily pass our constraints to it to handle the filtering
     However, since we only have an object here, we can manually filter our data
    */

   cacheCommuteData();

    //since i was not sure of the performace of searching a large JSON object
    //I opted to build a dictionary tying the commute time (value) to each zip (key)
    //
    //so for now we will only support lookup by 1 zipCode
    // if needed we can add additioan search patterns

    var result=[];

    Object.keys(query).every((queryKey) => {
       if (queryKey=='zipCode') { 
           var zipCode = query[queryKey];  
           if (commuteJSONExists(zipCode))
               result.push(commuteJSON(zipCode));
        }
    });

    return result;
};


/**
    The model would make an api request using axios or a database request if no api is available
    The get method returns data that matches the given constraints
    @returns {CommuteJsonObject|Array} An array CommuteJsonObject data
*/
exports.get = async (id) => {
    console.log('CommuteModel get');

    cacheCommuteData();
    return commuteJSON(id);

    throw new Error(`Could not find object with zipCode ${zipCode}`);

};


/**
    The model would make an api request using axios or a database request if no api is available
    The edit method will edit an existing data store record with the given parameters
    @returns {CommuteJsonObject} The new CommuteModel data
    @throws Will throw an error if the method is used.
*/
exports.update = async () => {
    console.log('CommuteModel edit');
    throw new Error('CommuteModel does not support "update"');
};

/**
    The model would make an api request using axios or a database request if no api is available
    The delete method will edit an existing data store record with the given parameters
    @returns {undefined}
    @throws Will throw an error if the method is used
*/
exports.delete = async () => {
    console.log('CommuteModel delete');
    throw new Error('CommuteModel does not support "delete"');
};
