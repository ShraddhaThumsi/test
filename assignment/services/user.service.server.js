/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, model, passport){

    var pp = passport.passportObject();
    var bcr = passport.bcryptObject();
    app.get ('/auth/facebook', pp.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/google', pp.authenticate('google', {scope:['profile', 'email'] }));
    app.post('/api/login', pp.authenticate('assignmentLocalStrategy'),login);
    app.post("/api/checkLogin", checkLogin);
    app.post("/api/logout", logout);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post("/api/register", register);
    app.get('http://www.example.com/auth/google/oath2callback',
        pp.authenticate('google', {
        successRedirect: "/assignment/index.html/#/user",
        failureRedirect: "/assignment/index.html/#/login"
    }));
    app.get('/auth/facebook/callback',
        pp.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));


    function checkLogin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }

    function logout(req, res)
    {
        req.logout();
        res.send(200);
    }


    function login(req, res)
    {

        var user = req.user;
        res.json(user);

    }


    // ============================================================
    function createUser(req, res){
        var user = req.body;
        /*user._id = (new Date()).getTime();
        users.push(user);*/
        model
            .userModel
            .createUser(user)
            .then(function(newUser) {
                res.send(newUser);
            },
                function(error)
                {
                    res.sendStatus(400).send(error);
                }

            );

    }

    function updateUser(req, res)
    {
        var user = req.body;
        var userId = req.params.uid;
        model
            .userModel
            .updateUser(userId, user)
            .then(function(status) {
                    res.sendStatus(status);


            }, function(error) {
                res.sendStatus(400).send(error);

            });
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

    function findUser(req,res)
    {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function(users){
                if(users)
                {
                    res.json(users);
                }

                else
                {
                    res.send('0');
                }
            } , function(error){
                res.sendStatus(400).send(error);
            });

    }

    function findUserByUsername(req, res)
    {
        var userName = req.query.username;
        model
            .userModel
            .findUserByUserName(userName)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }

            else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })

    }

    function findUserByCredentials(req, res)
    {
        var userName = req.query.username;
        var userPassword = req.query.password;
        model
            .userModel
            .findUserByCredentials(userName, userPassword)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }
                else
                    {
                        res.send('0');
                    }


            }, function(error){

                res.sendStatus(400).send(error);
            })


    }

    function findUserById(req, res)
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

    function register(req, res)
    {
        var newUser = req.body;
        newUser.password = bcr.hashSync(newUser.password);
        model
            .userModel
            .createUser(newUser)
            .then(function(newUser){
                console.log(newUser);
                if(newUser)
                {
                    req.login(newUser, function(err){
                        if(err.code === 11000)
                        {
                            res.sendStatus(409).send("duplicate user name");
                        }
                        else
                        {
                            res.json(newUser);
                        }
                    })
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })
    }
}