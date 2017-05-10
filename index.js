var fs = require("fs");

// Create the base directory to hold all the jsons
var jSONDirExists = true;
var population2010=0;
    var population2011=0;
    var population2012=0;
    var population2013=0;
    var pp2010=0;
    var pp2011=0;
    var pp2012=0;
    var pp2013=0;
    var gdp2010=0;
    var gdp2011=0;
    var gdp2012=0;
    var gdp2013=0;

// Save the continent names in a JSON
createContinentsJSON();

// Save the Country and continent mapping
createCountriesAndContinentJSON();

// function call to create the JSON String representation of the data
createJSONFromFile( '/home/user/workspace/datamunging-boilerplate/data/population.csv' );  // accepts the raw content's file path

// Function to create JSON for Graph 1,2,3
function createJSONForGraph123( processedData ) {
  var graphDataArray = [];
  var noOfRows = processedData.length;

  for (var i = 0; i < noOfRows; i++) {
    graphDataArray[i] = {
      countryName : processedData[i][0],
      population2013 : processedData[i][5],
      gdp2013 : processedData[i][9],
      pp2013 : processedData[i][17]
    };
  }

  var fileName = "graph123";
  writeJSONToDisk( fileName, JSON.stringify( graphDataArray ) );// Write to disk

} // End createJSONForGraph123()


// Function to create JSON for Graph 2, Growth in Population and Purchasing Power from 2010 to 2013
function createJSONForGraph2( processedData ) {
  var graphDataArray = [];
  var noOfRows = processedData.length;

  for (var i = 0; i < noOfRows; i++) {
    graphDataArray[i] = {
      countryName : processedData[i][0],
      population2010 : processedData[i][2],
      population2011 : processedData[i][3],
      population2012 : processedData[i][4],
      population2013 : processedData[i][5],
      pp2010 : processedData[i][14],
      pp2011 : processedData[i][15],
      pp2012 : processedData[i][16],
      pp2013 : processedData[i][17]
    };
  }

  var fileName = "pop_pp_growth_graph";
  writeJSONToDisk( fileName, JSON.stringify( graphDataArray ) );// Write to disk

} // End createJSONForGraph2()

// Function to create JSON for Graph 3, Population and GDP by continents
function createJSONForGraph3( processedData ) {
  var graphDataArray = [];
  var noOfRows = processedData.length;

  for (var i = 0; i < noOfRows; i++) {
    graphDataArray[i] = {
      countryName : processedData[i][0],
      population2010 : processedData[i][2],
      population2011 : processedData[i][3],
      population2012 : processedData[i][4],
      population2013 : processedData[i][5],
      gdp2010 : processedData[i][6],
      gdp2011 : processedData[i][7],
      gdp2012 : processedData[i][8],
      gdp2013 : processedData[i][9]
    };
  }

  var fileName = "continent_wise_graph";
  writeJSONToDisk( fileName, JSON.stringify( graphDataArray ) );// Write to disk

} // End createJSONForGraph3()

// function to create a JSON String
function createJSONFromFile( file ) {
  var fileName = file.substr( file.lastIndexOf("/") + 1, file.length );
  console.log("Started reading file " + file );
  var rawData = fs.readFileSync( file );
  console.log("Completed reading file " + file );

  rawData = rawData.toString();

  // Various parameters for createJSONFromFile() function
  var newLineCharacter = /\r\n|\n/;
  var delim = ",";
  var isDataQuoted = false;
  var lines = rawData.split( newLineCharacter );
  var noOfLines = lines.length;
  var noOfCols = ( lines[0].split( delim) ).length;
  var noOfRows = 0;
  var processedData = [];
  for( var i = 0; i < noOfLines; i++ ) {
    var line = lines[i];
    if( line != null && line != '' && line.length != 0 ) {
      noOfRows ++;
      var tokens = line.split( delim );
      processedData.push( tokens ); // pushes a line of tokens, which is an array, into the processedData[] array
    }
  }

     population2010=processedData.indexOf("population2010");
     population2011=processedData.indexOf("population2011");
     population2012=processedData.indexOf("population2012");
     population2013=processedData.indexOf("population2013");
     pp2010=processedData.indexOf("pp2010");
     pp2011=processedData.indexOf("pp2011");
     pp2012=processedData.indexOf("pp2012");
     pp2013=processedData.indexOf("pp2013");
     gdp2010=processedData.indexOf("gdp2010");
     gdp2011=processedData.indexOf("gdp2011");
     gdp2012=processedData.indexOf("gdp2012");
     gdp2013=processedData.indexOf("gdp2013");


  // Create the graph specific JSONs
  createJSONForGraph123( processedData );
  createJSONForGraph2( processedData );
  createJSONForGraph3( processedData );

} // End createJSONFromFile





// Function to create continents JSON
function createContinentsJSON() {
  // var continents = ["\"AFRICA\"","\"ANTARCTICA\"","\"ASIA\"","\"AUSTRALIA\"","\"EUROPE\"","\"NORTH AMERICA\"","\"SOUTH AMERICA\""];
  var continents = ["AFRICA","ANTARCTICA","ASIA","AUSTRALIA","EUROPE","NORTH AMERICA","SOUTH AMERICA"];
  writeJSONToDisk("continents", JSON.stringify( continents ) );
} // End createContinentsJSON()

// Function to create a JSON representing the mapping between Country and its continent
function createCountriesAndContinentJSON() {
  //var continents = ["AFRICA","ANTARCTICA","ASIA","AUSTRALIA","EUROPE","NORTH AMERICA","SOUTH AMERICA"];
  var content = fs.readFileSync('output/continents.json');
  var continents = JSON.parse( content.toString() );
  var countriesAndContinents = [
     { country:"ARGENTINA", continent:continents[6] },
     { country:"AUSTRALIA", continent:continents[3] },
     { country:"BRAZIL", continent:continents[6] },
     { country:"CANADA", continent:continents[5] },
     { country:"CHINA", continent:continents[2] },
     { country:"FRANCE", continent:continents[4] },
     { country:"GERMANY", continent:continents[4] },
     { country:"INDIA", continent:continents[2] },
     { country:"INDONESIA", continent:continents[2] },
     { country:"ITALY", continent:continents[4] },
     { country:"JAPAN", continent:continents[2] },
     { country:"MEXICO", continent:continents[5] },
     { country:"RUSSIA", continent:continents[2] },
     { country:"SAUDI ARABIA", continent:continents[2] },
     { country:"SOUTH AFRICA", continent:continents[0] },
     { country:"REPUBLIC OF KOREA", continent:continents[2] },
     { country:"TURKEY", continent:continents[2] },
     { country:"UNITED KINGDOM", continent:continents[4] },
     { country:"USA", continent:continents[5] },
     { union:"EUROPEAN UNION", continent:continents[4] }
     ];

    writeJSONToDisk('countriesAndContinents', JSON.stringify( countriesAndContinents ) );
} // End createCountriesAndContinentJSON()

// Function to write the contents to disk
function writeJSONToDisk( fileName, content ) {
  var jSONFileName = fileName + '.json';

  if( jSONDirExists ) {
    fs.writeFileSync('output/' + jSONFileName, content );
    console.log("Completed writing \"" + fileName + "\" to output/" + jSONFileName);
    // console.log(content);
  } else {
    console.log("Could not write " + fileName + " to disk. json directory does not exist.");
  }
} // End writeJSONToDisk()

