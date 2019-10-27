const timeUtils = require('../util/date-operations');
const asyncUtils = require('../util/async-utils');
const bucketName = "vigsi-data-processed";

const getArimaUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);

    let urls = []

    await asyncUtils.asyncForEach(hours, async (hour) => {
        var params = {
            Bucket: bucketName,
            Key: hour.split('T')[0] + "/arima/" + hour
        }
        let url = await asyncUtils.getSignedUrlPromise('getObject', params);
        urls.push(url);
    }); 

    return urls;
}


const getNNUrls = async (params) => {
    let hours = await timeUtils.computeAllHours(params['start'], params['end']);

    let urls = []

    await asyncUtils.asyncForEach(hours, async (hour) => {
        var params = {
            Bucket: bucketName,
            Key: hour.split('T')[0] + "/nn/" + hour
        }
        let url = await asyncUtils.getSignedUrlPromise('getObject', params);
        urls.push(url);
    }); 

    return urls;
}

module.exports = {
    getArimaUrls,
    getNNUrls
}