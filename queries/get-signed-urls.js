const timeUtils = require('../util/date-operations');
const asyncUtils = require('../util/async-utils');
const bucketName = "vigsi-data-processed";

//TODO: Only return URLs that have an actual object behind them

const requestUrls = async (params, algorithm) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);
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
    return await requestUrls(params, "arima");
}

const getNNUrls = async (params) => {
    return await requestUrls(params, "nn");
}

module.exports = {
    getArimaUrls,
    getNNUrls
}