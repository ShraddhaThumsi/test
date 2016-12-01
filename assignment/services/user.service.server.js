/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, model){
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;
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
    passport.use(new localStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    app.post('/api/login', passport.authenticate('local'),login);
   // app.post("/api/checkLogin", checkLogin);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
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

    function localStrategy(username, password, done)
    {

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                if(!user)
                {
                    return done(null, false);
                }
                return done(null, user);

            }, function(error){

                res.sendStatus(400).send(error);
            })

    }

    function login(req, res)
    {

        var user = req.user;
        res.json(user);

    }

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
        /*var userId = req.params['uid'];
        for(var u in users)
        {
            if(users[u]._id == userId)
            {
                users[u] = user;
            }
        }
        res.send(200);*/
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
        /*var userId = req.params['uid'];
        for(var u in users)
        {
            if(users[u]._id == userId)
            {
                users.splice(u, 1);
            }
        }
        res.send(200);*/
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
                    res.json(users[0]);
                }

                else
                {
                    res.send('0');
                }
            } , function(error){
                res.sendStatus(400).send(error);
            });

        /*var params = req.params;*/
        /*var query = req.query;

        if(query.username && query.password)
        {
            findUserByCredentials(req, res);
        } else if(query.username)
        {
            findUserByUsername(req, res);
        }
        res.send(users);*/
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
        /*for(var u in users)
        {
            if(users[u].username === userName)
            {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
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
        /*res.send('0');*/
        /*for(var u in users)
        {
            if(parseInt(users[u]._id) === userId)
            {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
    }
}