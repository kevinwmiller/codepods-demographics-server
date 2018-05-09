/**
    @exports CommuteModel
    @file Manages commute time and zip code data from constious data sources
    @typedef {Object} CommuteDetails
    @property {string} zipCode the zip code of interest
    @property {string} commuteTime commute time (in minutes) for the zip code

 */

/**
 *  include commuteData_CensusGov.json >> Commute Time by Zip Code JSON DB
 *      the JSON was built from the 2006-2011 U.S. Census American Community Survey 5-year estimates. 
 *      and was downladed as a CSV file from https://data.world/scxt/commute-times-by-zipcode

 */

const commuteData = require('../modeldata/commuteData_CensusGov');

/**
 *  Using two  DBs that tie zipcodes to map cooridinates:
 *      zipCodeData_CensusGov.json  from: www2.census.gov/geo/tiger/GENZ2017/shp/cb_2017_us_zcta510_500k.zip     
 *          this version has zip, state, county, and long/lat     
 *      zipCodeData_GeoCommons.json from: https://www.google.com/fusiontables/DataSource?docid=1fzwSGnxD0xzJaiYXYX66zuYvG0c5wcEUi5ZI0Q
 *          this version has additional info including geometry information that defines the outline of the zipcode
 * 
 *  the three files DO NOT all have the same zipcodes so, we will be using all three to find out info for any zip
 *  and we will expect that for some zips, we wont have ZipCode and/or map coordinates and/or geometry info
 */

const zipCodeData_NoGeometry = require('../modeldata/zipCodeData_CensusGov');

const ZipCodeData_Geometry = require('../modeldata/zipCodeData_GeoCommons');


/**
 * Gets the commute details by zip code.
 *
 * @param      {Function}  zipCode  The zip code
 * @return     {Object}    The commute details by zip code.
 */
function getCommuteDetailsbyZipCode(zipCode)
{
    if (!isValidUSZip(zipCode))
        throw new Error(`Invalid parameter: zipCode '${zipCode}'` );     

    const keyZipCode = trimZipCode(zipCode);

    //Default all consts to default state
    let commuteTime= '';
    let latitude = '';
    let longitude = '';
    let state='';
    let county='';
    // let placeName = '';
    // let area = '';
    // let kmlBoundary = '';
 
    let dataItem = commuteData.find( x => x.zipCode === keyZipCode );
    commuteTime = (dataItem) ? dataItem.commuteTimeMinsEst : '';

    dataItem = ZipCodeData_Geometry.find( x => x.zipCode === keyZipCode );
    if (dataItem) {
        latitude = dataItem.latitude;
        longitude = dataItem.longitude;
        state = dataItem.state;
        // placeName = dataItem.placeName.toProperCase();
        // area = dataItem.area;
        // kmlBoundary = dataItem.kmlBoundary;
    }

    dataItem = zipCodeData_NoGeometry.find( x => x.zipCode === keyZipCode );
    if (dataItem) {
        if (!latitude) {
            latitude = dataItem.latitude;
        }
        if (!longitude) {
            longitude = dataItem.longitude;
        }
        if (!state) {
            state = dataItem.state;
        }
        county = dataItem.county;
    }

    return { 
        zipCode : padZipCode(keyZipCode),
        commuteTime : commuteTime,
        location : {
            latitude,
            longitude
        },
        state : state,
        county : county,
        // placeName,
        // area,
        // kmlBoundary,
    };
};


 /**
  * Gets the commute detail by state
  *
  * @param      {<type>}  state  The border box to fetch commute data for
  * @return     {Array}   The commute detail by map bounds.
  */
function getCommuteDetailByState(state)
{    
    if (state.length != 2)
        throw new Error(`Invalid parameter: state '${state}'` );     

    //Default all consts to default state
    const found1 = zipCodeData_NoGeometry.filter(  
        function (value) {  
            return (value.state.toUpperCase()==state.toUpperCase())
        });

    const found2 = ZipCodeData_Geometry.filter(  
        function (value) {  
            return (value.state.toUpperCase()==state.toUpperCase())
        });

    const results = [];
    
    for (let i = 0; i < found1.length; ++i) {
            results.push(getCommuteDetailsbyZipCode(found1[i].zipCode));
    }

    for (let i = 0; i < found2.length; ++i) {
            if (!existsByZipCode(results, found2[i].zipCode)) {
                results.push(getCommuteDetailsbyZipCode(found2[i].zipCode));
            }
    }

    return results;
};

 /**
  * Gets the commute detail by county (return all states with county match)
  *
  * @param      {<type>}  state   The state  to fetch commute data 
  *                                 if no state, then all states will return that match county
  * @param      {<type>}  county  The border box to fetch commute data for
  * @return     {Array}   The commute detail by map bounds.
  */
 function getCommuteDetailByStateCounty(state, county)
  {
    if (state && state.length != 2)
        throw new Error(`Invalid parameter: state '${state}'` );     

    //Default all consts to default state
    const found1 = zipCodeData_NoGeometry.filter(  
       function (value) {
            if (state)
               return (value.county.toUpperCase()==county.toUpperCase()
                    && value.state.toUpperCase()==state.toUpperCase())
            else         
                return (value.county.toUpperCase()==county.toUpperCase())
       });

    const results = [];

    for (let i = 0; i < found1.length; ++i) {
        results.push(getCommuteDetailsbyZipCode(found1[i].zipCode));
    }

    return results;
};

/**
  * Gets the commute detail by map bounds.
  *
  * @param      {<type>}  border  The border box to fetch commute data for
  * @return     {Array}   The commute detail by map bounds.
  */
function getCommuteDetailByMapBounds(border)
{  
    if (!border || !border.topRight || !border.bottomLeft
            || !border.topRight.latitude || !border.bottomLeft.latitude
            || !border.topRight.longitude || !border.bottomLeft.longitude) {
                throw new Error(`Invalid parameter: border '${border}'` );
    }
  
    const smallestLat = border.bottomLeft.latitude;
    const smallestLng = border.bottomLeft.longitude;
    const largestLat = border.topRight.latitude;
    const largestLng = border.topRight.longitude;             

    // Create an array that contains the string  
    // values that are in the original array.  
 
    const foundZips1 = zipCodeData_NoGeometry.filter(  
        function (value) {  
            return (
                   Number(value.latitude) >= Number(smallestLat) 
                && Number(value.latitude) <= Number(largestLat)
                && Number(value.longitude) >= Number(smallestLng)
                && Number(value.longitude) <= Number(largestLng)
            );  
        });

    const foundZips2 = ZipCodeData_Geometry.filter(  
        function (value) {  
            return (
                    Number(value.latitude) >= Number(smallestLat) 
                && Number(value.latitude) <= Number(largestLat)
                && Number(value.longitude) >= Number(smallestLng)
                && Number(value.longitude) <= Number(largestLng)
            );  
        });

    const results = [];
    
    let foundZips = foundZips1;
    for (let i = 0; i < foundZips.length; ++i) {
            results.push(getCommuteDetailsbyZipCode(foundZips[i].zipCode));
    }

    foundZips = foundZips2;
    for (let i = 0; i < foundZips.length; ++i) {
            if (!existsByZipCode(results, foundZips[i].zipCode)) {
                results.push(getCommuteDetailsbyZipCode(foundZips[i].zipCode));
            }
    }

    // TODO: Expand the map area to make sure we get zips that cross the boundaries

    return results;
};

/**
 * Determines if zipcode is valid.
 *
 * @param      {<type>}   zipCode  The zip code
 * @return     {boolean}  True if valid us zip, False otherwise.
 */
function isValidUSZip(zipCode) {
    if (isNaN(zipCode)) {
        return false;
    }
    if (Number(zipCode) < 0 || Number(zipCode) > 99999) {
        return false;
    }
    return true;
}

/**
 * Removed any leading zeros from the zipcode
 *
 * @param      {string}  zipCode  The zip code
 * @return     {string}  Zipcode without any leading zeros (For commute data file)
 */
function trimZipCode( zipCode)
{
    return Number(zipCode).toString(); 
}

/**
 *
 * @param      {string}  zipCode  The zip code
 * @return     {string}  Pad zipcode to '0' padded 5 digit format
 */
function padZipCode(zipCode)
{
    return String(zipCode).padStart(5, "0");
}

/**
 * Determines if zipcode exists in commute data.
 *
 * @param      {<type>}  data     The data
 * @param      {string}  zipCode  The zip code
 * @return     {bool}  True if zip code exists, False otherwise.
 */
function existsByZipCode(data, zipCode)
{     
    return indexByZipCode(data, zipCode) >= 0;
};

/**
 *  is the Zip Code in commuteData?
 */

function indexByZipCode(data, zipCode)
{        
    return data.findIndex(x  => x.zipCode === zipCode);
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/**
 * Fetched commute information for the given zipcode and border boundaries
 *
 * @param      {string}  zipcode  a single zipcode or an array of zipcodes
 * @param      {string}  border border box for the desired  area
 * @param      {string}  state state  for the desired area (if no county, then all counties included)
 * @param      {string}  county county for the desired  area (if no state, then all states included)
 * 
 * @return     {CommuteDetails[]} A list of objects containing commute details for the zipcode(s)
 */
exports.get = (zipCode, border, state, county) => {
    console.log('Commute get');

    let methods=0
    if (zipCode) methods++; if (border) methods++; if (state || county) methods++; 
    if (methods>1)
        throw new Error('Cannot lookup by multple methods. Must be [zipCode] or [border] or [state, county]');

    const result=[];

    if (border) {
        console.log(border);
        return getCommuteDetailByMapBounds(border);
    }

    if (zipCode) {
        console.log(zipCode);
        if (Array.isArray(zipCode)) {
            for (let i = 0; i < zipCode.length; ++i) {
                result.push(getCommuteDetailsbyZipCode(zipCode[i]));
            }
        } else {
            result.push(getCommuteDetailsbyZipCode(zipCode));
        }
        return result;
    }

    if (county) {
        console.log(state);
        console.log(county);
        return getCommuteDetailByStateCounty(state, county);
    }

    if (state) {
        console.log(state);
        return getCommuteDetailByState(state);
    }
    throw new Error('No Lookup criteria provided');
};