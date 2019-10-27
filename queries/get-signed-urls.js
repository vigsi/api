var timeUtils = require('../util/date-operations')

const getArimaUrls = async (params) => {
    console.log("hello arima!");
    console.log(params);

    let hours = await timeUtils.computeAllHours(params['start'], params['end']);

    return hours;
}


const getNNUrls = (params) => {
    console.log("hello nn!")
    console.log(params);
}

module.exports = {
    getArimaUrls,
    getNNUrls
}