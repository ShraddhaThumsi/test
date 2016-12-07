/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(app, model){
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
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
   // app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/checkLogin", checkLogin);
    app.post("/api/login", login);
    app.post("/api/user", createUser);
    app.get("/api/user/:uid", viewGroup);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.put("/api/user/:uid/receiver/:rid", sendEmail);
    app.delete('/api/user/:uid', deleteUser);
    app.get("/api/user", findAllUsers);
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/user',
            failureRedirect : '/login'
        }));

    app.post("/api/logout", logout);

    var facebookConfig = {
            clientID      : '1105625596221973', // your App ID
            clientSecret  : '8bdc9b5390eeb9c6fe81984a919eb981', // your App Secret
            callbackURL   : 'https://shraddhathumsi.herokuapp.com/auth/facebook/callback'
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done)
    {

        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            facebook: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );

    }

    function logout(req, res)
    {
        req.logout();
        res.send(200);
    }
    function checkLogin(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0')
    }

    function localStrategy(email, password, done){

        model
            .userModel
            .findUserByCredentials(email, password)
            .then(function(user){
                if(!user)
                {
                    return done(null,false);
                }
                return done(null, user);

            } , function(error){
                res.sendStatus(400).send(error);
            });
    }

    function login(req, res)
    {
        /*var user = req.user;
        res.json(user);*/

        var user = req.body;
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
            });

    }
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

    function findAllUsers(req, res)
    {
        model
            .userModel
            .findAllUsers()
            .then(function(users){
                console.log(users);
                res.send(users);
            },
            function(error){
                res.sendStatus(400).send(error);
            })
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

    function sendEmail(req, res)
    {
        console.log(__filename);
        var message = req.body.message;
        console.log(message);
        var userId = req.params.uid;
        var popularUserId = req.params.rid;
        console.log(popularUserId);
        model
            .userModel
            .sendEmail(popularUserId, message)
            .then(function(status){
                res.sendStatus(status);
            },
                function(error){
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
}