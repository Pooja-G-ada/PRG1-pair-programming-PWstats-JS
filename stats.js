const fs = require("fs");
const { stringify } = require("querystring");
// require/import fs-js module which enables us to read/write/create files 

const inputFile = "10000-common-passwords.csv";
// declaring a constant variable & the identifier "inputFile" for file with the name "10000-common-passwords.csv"
const outputFile = "statistics.csv";
// declaring a constant variable & the identifier "outputFile" for file with the name "statistics.csv"
const delimiter = ",";
// declaring a constant variable & the identifier "delimiter" for string ","

function deleteExistingOutputFile() {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  } 
}

// function here is to take data from inpit file, split by new line \n which gives back an array saved in a variable lines.
// iterated through the array to split each element or string of the array to split by ","
function processData() {
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);

  // -----create array to store password counts - an array of objects---- 
  let statisticsArray =[]
  let outputObject = {
    chars: 0,
    count: 0,
  }
  statisticsArray.push(outputObject);

// -----loop through each line in input file-----------
  for (let line of lines) {
    elements = line.split(delimiter);
    passwordLength = elements[1].length; 
    // -----loop through each object in statisticsArray which output array-----------
    const existingObject = statisticsArray.find(object => object.chars === passwordLength);
      if (existingObject) {
        existingObject.count += 1;
      } else {
        statisticsArray.push({ chars: passwordLength, count: 1 });
      };
  }

// -----sort the statisticArray in ascending order by key chars.-----------
  statisticsArray = statisticsArray.sort((a, b) => a.chars - b.chars)

// -----loop through statisticArray to turn the whole array into a string to append to output file -----------
  let outputData = ``;
    for (const item of statisticsArray){
      outputData = outputData + `Chars: ${item.chars}, Count: ${item.count} \n` 
    }
    
// -----cheking type of outputData -----------
  //  const typeOfOutputData = typeof outputData;
  //  console.log(typeOfOutputData);

// -----append outputData to the outputFile-----------
  fs.appendFileSync(outputFile, outputData);
  
}

// Main execution
// deleteExistingOutputFile(); 
deleteExistingOutputFile();
processData();
