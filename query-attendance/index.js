const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-2'});

//const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
const ddb = new AWS.DynamoDB.DocumentClient();
const table = 'community-attendance'

exports.handler = (event, context, callback) => {
  queryAttendance(event, data => {
    callback(null, data);
  });
}

const queryAttendance = (query, callback) => {
  const params = {
    TableName: table,
    ExpressionAttributeNames: {
      '#communityName': 'communityName'
    },
    ExpressionAttributeValues: {
      ':communityName': query.communityName
    },
    FilterExpression: '#communityName = :communityName'
  }

  ddb.scan(params, (err, data) => {
    if(err) {
      console.log("Error", err)
    } else {
      console.log("Success", data.Items)
    }
    callback(data.Items)
  })
}

const q = {
  communityName: 'awesome-dev'
}

queryAttendance(q, res => console.log(res))