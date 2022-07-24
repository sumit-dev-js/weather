const request = require('request');

const forecast = (lat , long, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=076c7befc2152e2815ad991171a5eb28&query='+long+','+lat;

    request({url: url, json:true}, (error, res) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else{
            callback(undefined, "It is currently "+res.body.current.temperature+" degress Celcius and chance of rain is "+ res.body.current.precip + " % .");
        }
    });
};

module.exports = forecast;