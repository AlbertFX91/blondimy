var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: {type: String, required : true, unique : true, dropDups: true },
    hash: { type: String, required: true },
    created: { type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

export default User;