'use strict';

const AWS = require('aws-sdk');

const host = process.env.LOCALSTACK_HOST || localhost;
const s3port = process.env.S3_PORT || "4566";
const s3config = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(`${host}:${s3port}`)
}


// Se passa congiruação com outro endpoint usa local (docker) se não passa usa produção AWS
const S3 = new AWS.S3(s3config);

module.exports.hello = async (event) => {
  const allBuckets = await S3.listBuckets().promise();
  console.log(allBuckets);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Eita'
      },
      null,
      2
    ),
  };

};
