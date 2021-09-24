// require and run our main fetch function
const { nextISSTimesForMyLocation } = require('./iss.js')

// index.js
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// fetchISSFlyOverTimes({ latitude: 43.696, longitude: -79.6344 }, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data)
//   }
// })

// fetchCoordsByIP("{\"ip\":\"99.253.62.18\"}", (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// })
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
