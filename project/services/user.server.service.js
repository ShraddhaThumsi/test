/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(app, model, passport){

    var pp = passport.passportObject();
    var bcr = passport.bcryptObject();
    app.post("/project/checkLogin", checkLogin);
    app.post("/project/login", pp.authenticate('projectLocalStrategy'), login);
    app.post("/project/user", createUser);
    app.get("/project/user/:uid", viewGroup);
    app.get('/project/user', findUserByCredentials);
    app.get('/project/user/:uid', findUserById);
    app.put('/project/user/:uid', updateUser);
    app.put('/project/user/:uid/receiver/:rid', sendEmail);
    app.delete('/project/user/:uid', deleteUser);

    app.get('/auth/facebook', pp.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        pp.authenticate('facebook', {
            successRedirect : '/user',
            failureRedirect : '/login'
        }));

    app.post("/project/logout", logout);

    app.get('/project/admin/users', getAllUsers);
    app.put("/project/admin/promoteMember/:memberId", promoteMemberByAdmin);
    app.delete("/project/admin/deleteMember/:memberId", deleteMemberByAdmin);

   /* app.post("/api/user/admin/:adminId/create", createUserByAdmin);
    app.put("/api/user/admin/:adminId/update", updateUserByAdmin);
    app.get("/api/user/admin/:adminId/getAllUsers", getAllUsersByAdmin);*/



    function logout(req, res)
    {
        req.logout();
        res.send(200);
    }
    function checkLogin(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0')
    }

    function login(req, res)
    {
        console.log("in Login");
        var user = req.user;
        res.json(user);
        /*var user = req.body;
        var email = user.email;
        var password = user.password;
        model
            .userModel
            .findUserByCredentials(email, password)
            .then(function(user){
                if(user)
                {
                    res.json(user);
                }

                else
                {
                    res.send('0');
                }
            } , function(error){
                res.sendStatus(400).send(error);
            });*/

    }


    function createUser(req, res)
    {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(function(newUser){
                res.send(newUser);
            }, function(error){
                console.log(error);
                res.sendStatus(400).send(error);
            });
    }


    function findUserByCredentials(req,res)
    {

        var email = req.query.email;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(email, password)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }

                else
                {
                    res.send('0');
                }
            } , function(error){
                res.sendStatus(400).send(error);
            });
    }



    function findUserById(req,res)
    {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(req.params.uid)
            .then(function(user){

                    if(user)
                    {
                        res.send(user);
                    }

                    else
                    {
                        res.send('0');
                    }
                },
                function(error)
                {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req,res)
    {
        var user = req.body;
        var userId = req.params.uid;
        model
            .userModel
            .updateUser(userId, user)
            .then(function(promise) {
                console.log(promise);
                res.send(promise);
              //  res.sendStatus(status);


            }, function(error) {
                console.log("error",error);
                res.sendStatus(400).send(error);

            });
    }

    function sendEmail(req, res)
    {
        console.log("Send Mail Function", req.body);
        //console.log(__filename);
        var message = req.body;
        message = message.message;
        console.log(message);
        var userId = req.params.uid;
        var popularUserId = req.params.rid;
        console.log(popularUserId);
        model
            .userModel
            .sendEmail(popularUserId, message)
            .then(function(stats){
                res.sendStatus(200).send(stats);
            },
                function(err){
                res.sendStatus(400).send(error);
                })

    }

    function deleteUser(req, res)
    {
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(function(status){
                res.sendStatus(200);


            }, function(error){
                res.sendStatus(400).send(error);

            });
    }
    
    function viewGroup(req, res)
    {
        var userId = req.params.uid;
        model
            .userModel
            .viewInbox(userId)
            .then(function(users){
                res.send(users);
            }, function(error){
                res.sendStatus(400).send(error);
            });

    }

    function getAllUsers(req, res)
    {
        var user = req.body;
        console.log(__filename);
        /*if(user.role == "admin")
        {*/
            model
                .userModel
                .getAllUsers()
                .then(function(users){
                    res.json(users);
                }, function(error){
                    res.sendStatus(400).send(error);
                });

       // }
        /*else
        {*/
           // res.sendStatus(403);
        //}
    }


    function promoteMemberByAdmin(req, res)
    {
        var memberId = req.params.memberId;
        console.log(memberId)
    }

    function deleteMemberByAdmin(req, res)
    {
        var memberId = req.params.memberId;
        console.log(memberId);

    }




}