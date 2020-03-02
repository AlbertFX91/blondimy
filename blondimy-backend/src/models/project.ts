var mongoose = require("mongoose");
var schema = mongoose.Schema;

var projectSchema = mongoose.Schema({
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

var Project = mongoose.model('Project', projectSchema);

export default Project;