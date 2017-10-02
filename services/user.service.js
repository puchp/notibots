const User = require('../models/user');
const Message = require('../models/message');
const request = require('request');

module.exports = {
  getFacebookData: getFacebookData,
  saveUser: saveUser
}

// Get user data User Platform User Profile API and save it on the MongoDB
function saveUser(facebookId,textmsg, firstName, lastName) {

  getFacebookData(facebookId, function(err, userData){
    let user = {
      fid: facebookId,
      firstName: firstName || userData.first_name,
      lastName: lastName || userData.last_name
    };
    console.log("user : ",userData);

    User.collection.findOneAndUpdate({fid : facebookId}, user, {upsert:true}, function(err, user){

      if (err) console.log(err);
      else console.log('user saved');

    });


    if(textmsg){
      let msgdata = {
        fid: facebookId,
        msg: textmsg,
      };
      Message.collection.save(msgdata, function(err, msgs){

        if (err) console.log(err);
        else console.log('message saved');

        });
    }
  });
}

// Get User data from Messenger Platform User Profile API **NOT GRAPH API**
function getFacebookData(facebookId, callback) {

  request({
    method: 'GET',
    url: 'https://graph.facebook.com/v2.10/' + facebookId,
    qs: {
      access_token: process.env.FB_PAGE_ACCESS_TOKEN
    }
  },

  function(err, response, body) {

    let userData = null
    if (err) console.log(err);
    else userData = JSON.parse(response.body);

    callback(err, userData);
  });
}
