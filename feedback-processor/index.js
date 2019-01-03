const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

AWS.config.update({region: 'eu-west-2'});

const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
const table = 'community-attendance'

exports.handler = (event, context, callback) => {
  console.log(event)

  storeAttendanceData(event);
}

const storeAttendanceData = data => {
  const {communityName, name} = data;

  const date = new Date();

  let params = {
    TableName: table,
    Item: {
      'ID': {
        S: uuidv4() 
      },
      'communityName': {
        S: communityName
      },
      'name': {
        S: name
      },
      'datetime': {
        S: date.toUTCString()
      } 
    }
  }

  ddb.putItem(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}