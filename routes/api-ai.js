const userService = require('../services/user.service');

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Welcome to the Noti[bots]');
  });
  // API.AI webhook route
  app.post('/wookheb/apiai/', function(req, res) {

    // actions sent res
    res.status(200).json('Sucessfull');

    // Save User to MongoDB
    // console.log("got :",req.body);
    if(req.body){
      // console.log("got :",req.body.originalRequest.data);
      console.log("text :",req.body.originalRequest.data.message.text);
      userService.saveUser(req.body.originalRequest.data.sender.id,req.body.originalRequest.data.message.text);
    }
  });
}
