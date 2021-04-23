const moment = require('moment');

module.exports = (timeStamp) => {
    
    const formattedTimeStamp = moment(timeStamp).format("dddd, MMMM Do YYYY, h:mm:ss a");

    return formattedTimeStamp;
};