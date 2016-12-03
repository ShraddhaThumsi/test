/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(app, model){
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    app.post('/api/login', passport.authenticate('local'),login);
   // app.post("/api/checkLogin", checkLogin);
    app.post("/api/user", createUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    /*function checkLogin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }*/
    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        model
            .userModel
            .findUserById(user._id)
            .then(function(user)
            {
                done(null,user);
            }, function(error)
            {
                done(error, null);
            })

    }

    function localStrategy(email, password, done)
    {


        model
            .userModel
            .findUserByCredentials(email, password)
            .then(function(user){
                if(!user)
                {
                    return done(null, false);
                }
                return done(null, user);
            } , function(error){
                res.sendStatus(400).send(error);
            });

    }

    function login(req, res)
    {
        var user = req.user;
        res.json(user);

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
}