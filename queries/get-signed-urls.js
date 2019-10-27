const timeUtils = require('../util/date-operations');
const asyncUtils = require('../util/async-utils');
const bucketName = "vigsi-data-processed";

//TODO: Only return URLs that have an actual object behind them

const requestUrls = async (hours, algorithm) => {
    let urlPromises = []

    await asyncUtils.asyncForEach(hours, async (hour) => {
        var params = {
            Bucket: bucketName,
            Key: hour.split('T')[0] + "/" + algorithm + "/" + hour
        }
        let urlPromise = asyncUtils.getSignedUrlPromise('getObject', params);
        urlPromises.push(urlPromise);
    }); 

    return await Promise.all(urlPromises);
}

const getArimaUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);
    return await requestUrls(hours, "arima");
}

const getNNUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);
    return await requestUrls(hours, "nn");
}

module.exports = {
    getArimaUrls,
    getNNUrls
}