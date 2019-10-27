const timeUtils = require('../util/date-operations');
const asyncUtils = require('../util/async-utils');
const bucketName = "vigsi-data-processed";

//TODO: Only return URLs that have an actual object behind them

const getArimaUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);

    let urlPromises = []

    await asyncUtils.asyncForEach(hours, async (hour) => {
        var params = {
            Bucket: bucketName,
            Key: hour.split('T')[0] + "/arima/" + hour
        }
        let urlPromise = asyncUtils.getSignedUrlPromise('getObject', params);
        urlPromises.push(urlPromise);
    }); 

    let urls = await Promise.all(urlPromises);
    return urls;
}

const getNNUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);

    let urlPromises = []

    await asyncUtils.asyncForEach(hours, async (hour) => {
        var params = {
            Bucket: bucketName,
            Key: hour.split('T')[0] + "/nn/" + hour
        }
        let urlPromise = asyncUtils.getSignedUrlPromise('getObject', params);
        urlPromises.push(urlPromise);
    }); 

    let urls = await Promise.all(urlPromises);
    return urls;
}

module.exports = {
    getArimaUrls,
    getNNUrls
}