// It will contain most of the logic for fetching the data from each API endpoint.
const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, resp) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, resp)
      })
    })
  })
};


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    if (body) {
      const dataIP = JSON.stringify(body);
      if (dataIP.length === 0) {
        callback(error, null);
      } else {
        callback(null, dataIP);
      }
    }

    
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/99.253.62.18', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for ip. Response: ${body}`;
      callback(Error(msg), null);
    } else if (body) {
      const coords = JSON.parse(body);
      let data = {};
      data.latitude = coords.latitude;
      data.longitude = coords.longitude;
      callback(null, data);
    }
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request('https://iss-pass.herokuapp.com/json/?lat=43.696&lon=-79.6344', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for ip. Response: ${body}`;
      callback(Error(msg), null);
    } else if (body) {
      const resp = JSON.parse(body).response;
      callback(null, resp);

    }
  });
};


module.exports = {
  nextISSTimesForMyLocation
};