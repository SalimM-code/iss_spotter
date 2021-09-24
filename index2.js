const { nextISSTimesForMyLocation } = require('./iss_promised');
const { PrintPassTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    PrintPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("IT didn't work:", error.message);
  })