const express = require('express');
const urlQueries = require('./queries/get-signed-urls');
const asyncUtils = require('./util/async-utils');
const app = express();

//2019-10-27T06:00:00.000Z&2019-10-27T07:00:00.000Z
app.get('/api/arima/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
        const urls = await urlQueries.getArimaUrls(req.params);
        res.send(urls);
}));

app.get('/api/nn/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
    const urls = await urlQueries.getNNUrls(req.params);
    res.send(urls);
}));

app.get('/api/meas/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
  const urls = await urlQueries.getMeasUrls(req.params);
  res.send(urls);
}));

app.get('/api/measdaily/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
  const urls = await urlQueries.getMeasDailyUrls(req.params);
  res.send(urls);
}));

app.get('/api/measmonthly/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
  const urls = await urlQueries.getMeasMonthlyUrls(req.params);
  res.send(urls);
}));

app.get('/api/measyearly/:start&:end', asyncUtils.asyncMiddleware(async (req, res, next) => {
  const urls = await urlQueries.getMeasYearlyUrls(req.params);
  res.send(urls);
}));

app.listen(8080, function () {
  console.log('VIGSI API listening on port 8080!');
})
