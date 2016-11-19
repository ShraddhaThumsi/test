/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(app, model){
    app.post("/api/user", createUser);

    function createUser(req, res)
    {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(function(newUser){
                res.send(newUser);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }
}