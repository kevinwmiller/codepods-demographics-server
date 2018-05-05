/**
    @exports CommuteModel
    @file Manages commute data obtained from https://data.world/scxt/commute-times-by-zipcode

    @typedef {Object} CommuteDetails
    @property {string} zipCode the zip code of interest
    @property {string} commuteTime commute time (in minutes) for the zip code

 */

/**
 *  include commuteData_CensusGov.json >> Commute Time by Zip Code JSON DB
 *      the JSON was built from the 2006-2011 U.S. Census American Community Survey 5-year estimates. 
 *      and was downladed as a CSV file from https://data.world/scxt/commute-times-by-zipcode
 *  found two additional DBs that tie zipcodes to map cooridinates:
 *      zipCodeData_CensusGov.json  from: www2.census.gov/geo/tiger/GENZ2017/shp/cb_2017_us_zcta510_500k.zip     
 *          this version has zip, state, county, and long/lat     
 *      zipCodeData_GeoCommons.json from: https://www.google.com/fusiontables/DataSource?docid=1fzwSGnxD0xzJaiYXYX66zuYvG0c5wcEUi5ZI0Q
 *          this version has additional info including geometry information that defines the outline of the zipcode
 * 
 *  the three files DO NOT all have the same zipcodes so, we will be using all three to find out info for any zip
 *  and we will expect that for some zips, we wont have commute and/or map coordinates and/or geometry info
 */
const commuteData = require ('../modeldata/commuteData_CensusGov.json');


/**
 *  return Json strign version of commute Object
 */
function CommuteDetailsbyZipCode(zipCode)
{
    if (!isValidUSZip(zipCode))
        throw new Error('ZipCode "'+ zipCode + '" Is not a valid zip');     

    var keyZipCode = trimZipCode(zipCode);
    var paddedZipCode = padZipCode(keyZipCode);
    
    var commuteTime = ''; //default to blank if zip not found in DB
    if (indexByZipCode(keyZipCode) >= 0)
    {
        var commuteItem = commuteData.find( x => x.zip_code === keyZipCode );
        commuteTime = commuteItem.commute_time_mins_est;
    }

    return { "zipCode":  paddedZipCode,  "commuteTime" : commuteTime };
};

function isValidUSZip(zipCode) {
    if (isNaN( Number(zipCode) )) return false;
    if (Number(zipCode)<0 || Number(zipCode)>99999) return false   
    return true;
}

/*
 *  take the zipCode and make sure it is normalized to lookup from commuteData 
 */
function trimZipCode( zipCode)
{
    return Number(zipCode).toString(); 
}

/*
 *  Pad zipcode to '0' padded 5 digit format
 */
function padZipCode(zipCode)
{
    return String(zipCode).padStart(5, "0");
}

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
exports.getAll =  (zipCode) => {
    console.log('CommuteModel getAll zipCode = '+ zipCode);

    var result=[];

    if (Array.isArray(zipCode)) {
        for (var i = 0; i < zipCode.length; i++) {
            result.push(CommuteDetailsbyZipCode(zipCode[i]));
        }
    } else {
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
exports.get = (zipCode) => {
    console.log('CommuteModel get zipCode = '+ zipCode);
    return CommuteDetailsbyZipCode(zipCode);
};


