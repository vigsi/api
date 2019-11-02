const auth = require('../auth/credentials');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({accessKeyId : auth.aws_access_key_id, secretAccessKey : auth.aws_secret_access_key});

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const getSignedUrlPromise = (operation, params, timestamp) =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(operation, params, (err, url) => {
      err ? reject(err) : resolve({url: url, time: timestamp});
    });
});

module.exports = {
    asyncMiddleware,
    asyncForEach,
    getSignedUrlPromise
}