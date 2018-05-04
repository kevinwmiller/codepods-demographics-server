/**
    @exports CommuteModel
    @file Manages commute data obtained from https://data.world/scxt/commute-times-by-zipcode

    @typedef {Object} CommuteDetails
    @property {string} zipCode the zip code of interest
    @property {string} commuteTime commute time (in minutes) for the zip code

 */

/**
 *  include the Commute Time by Zip Code JSON DB
 *      the JSON was built from the 2006-2011 U.S. Census American Community Survey 5-year estimates. 
 *      and was downladed as a CSV file from https://data.world/scxt/commute-times-by-zipcode
 */
var commuteData = require ('../modeldata/commuteData.json');

/**
 *  return Json strign version of commute Object
 */
function CommuteDetailsbyZipCode(zipCode)
{ 
    var lookupZip = Number(zipCode).toString(); //zip code in db is non-zero padded number

    var index = indexByZipCode(lookupZip);
    if (index<0)
        throw new Error(`Could not find object with zipCode ${lookupZip.padStart(5, "0")}`);

    var commuteItem = commuteData.find( x => x.zip_code === lookupZip );
    var paddedZip = commuteItem.zip_code.padStart(5, "0")   
    var commuteTime = commuteItem.commute_time_mins_est;

    return { "zipCode":  paddedZip,  "commuteTime" : commuteTime };
};

/**
 *  is the Zip Code in commuteData?
 */
function existsByZipCode(zipCode)
{       
    if (indexByZipCode(zipCode) >= 0 )
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

/**
 * Requests crime data for a given border area from CrimeReports.com
 *
 * @param      {string}  zipcode  a single zipcode or an array of zipcodes
 * @return     {CommuteDetails[]} A list of objects containing commute details for the zipcode(s)
 */
exports.getAll = async (zipCode) => {
    console.log('CommuteModel getAll zipCode = '+ zipCode);

    var result=[];

    if (Array.isArray(zipCode)) {
        for (var i = 0; i < zipCode.length; i++) {
   //             if (existsByZipCode(zipCode[i]))
                    result.push(CommuteDetailsbyZipCode(zipCode[i]));
        }
    } else {

  //      if (existsByZipCode(zipCode))
               result.push(CommuteDetailsbyZipCode(zipCode));
    }

    return result;
};


/**
 * Requests crime data for a given border area from CrimeReports.com
 *
 * @param      {string}  zipCode    a single zipcode 
 * @return     {CommuteDetails}     a object containing commute details for the zipcode
 */
exports.get = async (zipCode) => {
    console.log('CommuteModel get zipCode = '+ zipCode);
    return CommuteDetailsbyZipCode(zipCode);
};


