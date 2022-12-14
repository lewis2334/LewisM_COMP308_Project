let csvToJson = require("convert-csv-to-json");

let fileInputName = "../dataset/heart.csv";
let fileOutputName = "../dataset/heart.json";
csvToJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
