/**
    @exports CommuteModel
    @file Models handle calls to the database or to fetch data from APIs

    @typedef {Object} CommuteJsonObject
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
commuteDatabase2 = {
    '21001': {
      zipCode: "21001",
      commuteTime: "100",
    },
    '21002': {
        zipCode: "21002",
        commuteTime: "200",
      },
      '21003': {
        zipCode: "21003",
        commuteTime: "300",
      },
      '21004': {
        zipCode: "21004",
        commuteTime: "400",
      },
      '21005': {
        zipCode: "21005",
        commuteTime: "500",
      },
      '21006': {
        zipCode: "21006",
        commuteTime: "600",
      }, 
  }




  commuteDatabase = {
    "8600000US00601": { "zipCode":601, "census_display_label":"ZCTA5 00601", "commuteTime":28.7, "margin_of_error":3.1},
    "8600000US00602": { "zipCode":602, "census_display_label":"ZCTA5 00602", "commuteTime":20.9, "margin_of_error":1.4},
    "8600000US00603": { "zipCode":603, "census_display_label":"ZCTA5 00603", "commuteTime":20.3, "margin_of_error":1.4},
    "8600000US00606": { "zipCode":606, "census_display_label":"ZCTA5 00606", "commuteTime":34.9, "margin_of_error":11.5},
    "8600000US00610": { "zipCode":610, "census_display_label":"ZCTA5 00610", "commuteTime":26.4, "margin_of_error":1.5},
    "8600000US00612": { "zipCode":612, "census_display_label":"ZCTA5 00612", "commuteTime":25.4, "margin_of_error":1.4},
    "8600000US00616": { "zipCode":616, "census_display_label":"ZCTA5 00616", "commuteTime":24.8, "margin_of_error":2.4},
    "8600000US00617": { "zipCode":617, "census_display_label":"ZCTA5 00617", "commuteTime":24.7, "margin_of_error":2},
    "8600000US00622": { "zipCode":622, "census_display_label":"ZCTA5 00622", "commuteTime":24.4, "margin_of_error":4.3}
  }

 

  //Debug messages to console
var turnOnDebug=1;
function consoleDebug(msg)
{
    if (turnOnDebug==1) console.log('>> '+msg);
}

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
    for(var zipCode in commuteDictionary) {
            consoleDebug(commuteJSON(zipCode));
    }
};

//return Json strign version of commute Object
function commuteJSON(zipCode)
{            
    var commTime = commuteDictionary[zipCode];
    return ':***{"_id":'+zipCode+',"zipCode":'+ zipCode +',"commuteTime":'+commTime+'}';
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

    commuteData = Object.values(commuteDatabase);

    // Filter our array to only those object that match every constraint passed in the query
    return commuteData.filter(commute => {
        // Not sure of the one-liner method to do this yet
        let matchesConstraints = true;
        Object.keys(query).every((queryKey) => {
            if (!(queryKey in commute) || commute[queryKey] !== query[queryKey]) {
                matchesConstraints = false;
                return;
            }
        });
        return matchesConstraints;
    });
};

/**
    The model would make an api request using axios or a database request if no api is available
    The get method returns data that matches the given constraints
    @returns {CommuteJsonObject|Array} An array CommuteJsonObject data
*/
exports.get = async (id) => {
    console.log('CommuteModel get');

    cacheCommuteData();

    console.log('CommuteModel get');
    
    if (id in commuteDatabase) {
        return commuteDatabase[id];
    }
    throw new Error(`Could not find object with ID ${id}`);
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
