const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-2'});

const ddb = new AWS.DynamoDB.DocumentClient();
const table = 'community-attendance'

module.exports.queryAttendanceByCommunityName = (communityName, callback) => {
  const params = {
    TableName: table,
    ExpressionAttributeNames: {
      '#communityName': 'communityName'
    },
    ExpressionAttributeValues: {
      ':communityName': communityName
    },
    FilterExpression: '#communityName = :communityName'
  }

  performScan(params, res => callback(res));
}

module.exports.queryAttendanceByDatetime = (datetime, callback) => {
  const params = {
    TableName: table,
    ExpressionAttributeNames: {
      '#datetime': 'datetime'
    },
    ExpressionAttributeValues: {
      ':datetime': datetime
    },
    FilterExpression: '#datetime = :datetime'
  }

  performScan(params, res => callback(res));
}

const performScan = (params, callback) => {
  ddb.scan(params, (err, data) => {
    if(err) {
      console.log("Error", err)
    } else {
      console.log("Success", data.Items)
    }

    callback(createResponse(data.Items));
  })
}

const createResponse = data => {
  return {
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {
      "X-Requested-With": '*',
      "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
    },
    "body": JSON.stringify(data)
  }
}