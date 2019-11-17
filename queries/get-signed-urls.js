const timeUtils = require('../util/date-operations');
const asyncUtils = require('../util/async-utils');
const luxon = require('luxon')
const bucketName = 'vigsi-data-processed';

//TODO: Only return URLs that have an actual object behind them

const requestUrls = async (params, algorithm, stepSize) => {
    let instants = await timeUtils.computeAllInstants(params['start'], params['end'], stepSize);
    let urlPromises = []

    await asyncUtils.asyncForEach(instants, async (instant) => {
        var params = {
            Bucket: bucketName,
            Key: instant.split('T')[0] + "/" + algorithm + "/" + instant
        }
        let urlPromise = asyncUtils.getSignedUrlPromise('getObject', params, instant);
        urlPromises.push(urlPromise);
    }); 

    return Promise.all(urlPromises);
}

const getArimaUrls = async (params) => {
    return await requestUrls(params, "arima", luxon.Duration.fromObject({ hours: 1 }));
}

const getNNUrls = async (params) => {
    return await requestUrls(params, "nn", luxon.Duration.fromObject({ hours: 1 }));
}

const getMeasUrls = async (params) => {
    return await requestUrls(params, "meas", luxon.Duration.fromObject({ hours: 1 }));
}

const getMeasDailyUrls = async (params) => {
    return await requestUrls(params, "measdaily", luxon.Duration.fromObject({ days: 1 }));
}

const getMeasMonthlyUrls = async (params) => {
    return await requestUrls(params, "measmonthly", luxon.Duration.fromObject({ months: 1 }));
}

const getMeasYearlyUrls = async (params) => {
    return await requestUrls(params, "measyearly", luxon.Duration.fromObject({ years: 1 }));
}

module.exports = {
    getArimaUrls,
    getNNUrls,
    getMeasUrls,
    getMeasDailyUrls,
    getMeasMonthlyUrls,
    getMeasYearlyUrls
}
