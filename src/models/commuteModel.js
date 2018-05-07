/**
    @exports CommuteModel
    @file Manages commute time and zip code data from various data sources
    @typedef {Object} CommuteDetails
    @property {string} zipCode the zip code of interest
    @property {string} commuteTime commute time (in minutes) for the zip code

 */

/**
 *  include commuteData_CensusGov.json >> Commute Time by Zip Code JSON DB
 *      the JSON was built from the 2006-2011 U.S. Census American Community Survey 5-year estimates. 
 *      and was downladed as a CSV file from https://data.world/scxt/commute-times-by-zipcode

 */

const commuteDataFile = require('../modeldata/commuteData_CensusGov.js');
const commuteData = commuteDataFile.getData();

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

const zipCodeData_NoGeometryFile = require('../modeldata/ZipCodeData_CensusGov.js');
const zipCodeData_NoGeometry = zipCodeData_NoGeometryFile.getData();

const zipCodeData_GeometryFile = require('../modeldata/ZipCodeData_GeoCommons.js');
const ZipCodeData_Geometry = zipCodeData_GeometryFile.getData();

/**
 *  return Json strign version of commute Object based on zipCode
 */
function getCommuteDetailsbyZipCode(zipCode)
{
    if (!isValidUSZip(zipCode))
        throw new Error('ZipCode "'+ zipCode + '" Is not a valid zip');     

    var keyZipCode = trimZipCode(zipCode);

    //Default all vars to default state
    var paddedZipCode = padZipCode(keyZipCode);
    var commuteTime= '';
    var latitude = '';
    var longitude = '';
    var placeName = '';
    var area = '';
    var kmlBoundary = '';
    var dataItem;
 
    dataItem = commuteData.find( x => x.zipCode === keyZipCode );
    commuteTime = (dataItem==undefined) ? '' : dataItem.commuteTimeMinsEst;

    dataItem = ZipCodeData_Geometry.find( x => x.zipCode === keyZipCode );
    if (dataItem!=undefined) {
        latitude = dataItem.latitude;
        longitude = dataItem.longitude;
 //       placeName = dataItem.placeName.toProperCase();
 //       area = dataItem.area;
 //       kmlBoundary = dataItem.kmlBoundary;
    }

    dataItem = zipCodeData_NoGeometry.find( x => x.zipCode === keyZipCode );
    if (dataItem!=undefined) {
        if (latitude=='') latitude = dataItem.latitude;
        if (longitude=='') longitude = dataItem.longitude;
//        if (placeName=='') placeName = dataItem.placeName;
    }

    return { "zipCode" : paddedZipCode,  
             "commuteTime" : commuteTime, 
             "location" : { "latitude" : latitude, "longitude":  longitude }, 
//             "placeName" : placeName, "area" : area
//            "kmlBoundary" : kmlBoundary 
            };
};

/**
 *  return Json strign version of commute Object based on rectangular map boundary coordinates
 */
function getCommuteDetailByMapBounds(smallestLat, smallestLng, largestLat, largestLng)
{  
    if (!isMapBoundaryArgumentDefined(smallestLat, smallestLng, largestLat, largestLng))
        throw new Error('Missing Map Bounds argumments');    
        
    // Create an array that contains the string  
    // values that are in the original array.  
 
    var foundZips1 = zipCodeData_NoGeometry.filter(  
        function (value) {  
            return (
                   Number(value.latitude) >= Number(smallestLat) 
                && Number(value.latitude) <= Number(largestLat)
                && Number(value.longitude) >= Number(smallestLng)
                && Number(value.longitude) <= Number(largestLng)
            );  
        });


    var foundZips2 = ZipCodeData_Geometry.filter(  
        function (value) {  
            return (
                    Number(value.latitude) >= Number(smallestLat) 
                && Number(value.latitude) <= Number(largestLat)
                && Number(value.longitude) >= Number(smallestLng)
                && Number(value.longitude) <= Number(largestLng)
            );  
        });
    
    //for now....until I merge the two (if time) pick the result that is larger (in case both dont have any zips undefined
    //if i have time, I will merge the two sources that have map coordinats for zips -- but either one will work for now
  
    var foundZips;
    var result = [];
    
    foundZips = foundZips1;
    for (var i = 0; i< foundZips.length; i++) {
            console.log(foundZips[i].zipCode);
            result.push(getCommuteDetailsbyZipCode(foundZips[i].zipCode));
    }

    foundZips = foundZips2;
    for (var i = 0; i< foundZips.length; i++) {
            console.log(foundZips[i].zipCode);
            result.push(getCommuteDetailsbyZipCode(foundZips[i].zipCode));
    }
    
    //////// ---- we shouuld probably expand the map area to make sure we get zips that cross the boundaries

    return result;
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
function existsByZipCode(data, zipCode)
{       
    if (indexByZipCode(data, zipCode) >= 0 )
        return true;

    return false;
};

/**
 *  is the Zip Code in commuteData?
 */
function indexByZipCode(data, zipCode)
{        
    return data.findIndex(x  => x.zip_code === zipCode);
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


/**
 *  Are map boundary coordinates supplied (must be all 4)
 */
function isMapBoundaryArgumentDefined(smallestLat, smallestLng, largestLat, largestLng)
{  
    console.log('isMapBoundaryArgumentDefined (('+ smallestLat+ ',' + smallestLng + '),(' +largestLat + ',' + largestLng + '))');

    //only support if rectangle is given
    args = 0;
    if (smallestLat!=undefined) args++;
    if (smallestLng!=undefined) args++;
    if (largestLat!=undefined) args++;
    if (largestLng!=undefined) args++;

    if (args >0 && args <4)
       throw new Error('Missing '+ (4-args) +' of 4 Map Bounds argumments');

    if (args == 4) return true
       
    return false;
};

/**
 *  is zipCode supplied supplied (must be all 4)
 */
function isZipCodeArgumentDefined(zipCode)
{
    console.log('isZipCodeArgumentDefined (' + zipCode + ')');

    if (zipCode==undefined)
        return false;

    return true;
};

/**
 * Requests crime data for a given border area from CrimeReports.com
 *
 * @param      {string}  zipcode  a single zipcode or an array of zipcodes
 * @param      {string}  zipCosmallestLat map boundary coordinate 
 * @param      {string}  smallestLng map boundary coordinate 
 * @param      {string}  largestLat map boundary coordinate 
 * @param      {string}  largestLngde map boundary coordinate 
 * @return     {CommuteDetails[]} A list of objects containing commute details for the zipcode(s)
 */
exports.getAll =  (zipCode, smallestLat, smallestLng, largestLat, largestLng) => {
    console.log('CommuteModel getAll zipCode= '+ zipCode + ' smallestLat ' + smallestLat
        + ' smallestLng ' + smallestLng +   ' largestLat ' + largestLat +   ' largestLng ' + largestLng);

    var byZipCode = isZipCodeArgumentDefined(zipCode);
    var byMapBoundary = isMapBoundaryArgumentDefined(smallestLat, smallestLng, largestLat, largestLng);
    var result=[];

    if  (byZipCode && byMapBoundary)
                throw new Error('Cannot lookup by BOTH ZipCode And Map Boundary Coordinates');

    if  (byMapBoundary)
    {
        result = getCommuteDetailByMapBounds(smallestLat, smallestLng, largestLat, largestLng);

        for (var i = 0; i< result.length; i++) {
            console.log(result[i])  ;
        }
        return result;
    }

    if  (byZipCode)
    {
        if (Array.isArray(zipCode)) {
            for (var i = 0; i < zipCode.length; i++) {
                result.push(getCommuteDetailsbyZipCode(zipCode[i]));
            }
        } else {
            result.push(getCommuteDetailsbyZipCode(zipCode));
        }

        return result;
    }

    throw new Error('No Lookup criteria provided');
};

/**
 * Requests crime data for a given border area from CrimeReports.com
 *
 * @param      {string}  zipCode    a single zipcode 
 * @return     {CommuteDetails}     a object containing commute details for the zipcode
 */
exports.get = (zipCode) => {
    console.log('CommuteModel get zipCode = '+ zipCode);

    var byZipCode = isZipCodeArgumentDefined(zipCode);

    if  (byZipCode)
    {
        if (zipCode=='runtests')
            return runTests();
    
        return getCommuteDetailsbyZipCode(zipCode);
    }

    throw new Error('No zipCode provided');
};

function runTests()
{
    console.log('Testing');

    var results = [];
    var zipCode;

//    smallestLat=39.50565195608165&smallestLng=-76.44096927896987&largestLat=39.57184407992466&largestLng=-76.28149585978042
//    smallestLat=39.50565195608165 smallestLng=-76.44096927896987 largestLat=39.57184407992466 largestLng=-76.28149585978042

    zipCode =0;
    results.push('--------------------');
    results.push('getCommuteDetailsbyZipCode '+zipCode);
    results.push(getCommuteDetailsbyZipCode(zipCode));
    results.push('--------------------');

    zipCode =12;
    results.push('--------------------');
    results.push('getCommuteDetailsbyZipCode '+zipCode);
    results.push(getCommuteDetailsbyZipCode(zipCode));
    results.push('--------------------');

    zipCode =501;
    results.push('--------------------');
    results.push('getCommuteDetailsbyZipCode '+zipCode);
    results.push(getCommuteDetailsbyZipCode(zipCode));
    results.push('--------------------');

    return results;
}
