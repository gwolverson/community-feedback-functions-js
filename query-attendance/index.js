const {
  queryAttendanceByCommunityName, 
  queryAttendanceByDatetime
} = require('./queryApi');

exports.handler = (event, context, callback) => {
  const params  =event.queryStringParameters;
  if(params.communityName) {
    queryAttendanceByCommunityName(params.communityName, data => {
      console.log(data)
      callback(null, data);
    });
  } else if(params.datetime) {
    queryAttendanceByDatetime(params.datetime, data => {
      callback(null, data);
    });
  } else {
    callback(null, {"statusCode": 400, "body": "One of communityName OR datetime must be provided (both can be used)"});
  }
}