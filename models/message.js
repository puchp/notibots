// Load mongoose since we need it to define a model
const mongoose = require('mongoose');

module.exports = mongoose.model('Messages', {
  fid: { type: String, required: true },
  msg: String
});
