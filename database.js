/**
 * Created by shraddha on 12/9/16.
 */
module.exports = function(mongoose)
{
    var connectionString = "mongodb://localhost/webdev-fall-2016";
    if (process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);

    var assignmentCollections = require('./assignment/models/model.server')(mongoose);
    var projectCollections = require('./project/models/model.server')(mongoose);

    var api = {
        project: project,
        assignment: assignment

    };
    return api;

    function assignment()
    {
        return assignmentCollections;
    }

    function project()
    {
        return projectCollections;
    }
}