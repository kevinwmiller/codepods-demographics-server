/**
    @exports CommuteModel
    @file Models handle calls to the database or to fetch data from APIs

    @typedef {Object} CommuteJsonObject
    @property {string} zipCode the zip code of interest
    @property {string} commuteTome commute time (in minutes) for the zip code

 */

/**
 *  include the Commute Time by Zip Code JSON DB
 *      the JSON was built from the 2006-2011 U.S. Census American Community Survey 5-year estimates. 
 *      and was downladed as a CSV file from https://data.world/scxt/commute-times-by-zipcode
 */
var commuteData = require ('../modeldata/commuteData.json');


/** 
    Debug messages to console 
*/
var turnOnDebug=1;  // ***** set this to 1 to show consoleDebug msgs (0 or anything otherthan 1 to turn off)
function consoleDebug(msg)
{
    if (turnOnDebug==1) console.log('>> '+msg);
};


/**
 *  return Json strign version of commute Object
 */
function commuteJSON(zipCode)
{ 
    var lookupZip = Number(zipCode).toString(); //zip code in db is non-zero padded number

    var index = indexByZipCode(lookupZip);
    if (index<0)
        throw new Error(`Could not find object with zipCode ${lookupZip.padStart(5, "0")}`);

    var commuteItem = commuteData.find( x => x.zip_code === lookupZip );
    var paddedZip = commuteItem.zip_code.padStart(5, "0")   
    var commuteTime = commuteItem.commute_time_mins_est;

    return { "_id" : paddedZip, "zipCode":  paddedZip,  "commuteTime" : commuteTime };
};

/**
 *  is the Zip Code in commuteData?
 */
function commuteJSONExists(zipCode)
{            
    if (indexByZipCode(zipCode) > 0 )
        return true;
    
    return false;
};


/**
 *  is the Zip Code in commuteData?
 */
function indexByZipCode(zipCode)
{            
    return commuteData.findIndex(x  => x.zip_code === zipCode);
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
    return commuteJSON(id);
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
