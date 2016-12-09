/**
 * Created by shraddha on 12/9/16.
 */

module.exports = function(app, database){
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var bcrypt = require("bcrypt-nodejs");
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    var facebookConfig = {
        clientID     : "1105625596221973",
        clientSecret : "8bdc9b5390eeb9c6fe81984a919eb981",
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var googleConfig = {
        clientID     : "572165937749-u5cantnild7bq88bvru1lmkn0ca8gt89.apps.googleusercontent.com",
        clientSecret : "5jdyoSpFa8K_DwpAXeHuRPDh",
        callbackURL  : "http://www.example.com/auth/google/oath2callback"
    };

    passport.use('assignmentLocalStrategy', new LocalStrategy(assignmentLocalStrategy));
    passport.use('projectLocalStrategy',new LocalStrategy(projectLocalStrategy));
    passport.use('assignmentFB', new FacebookStrategy(facebookConfig, assignmentFacebookStrategy));
    passport.use('projectFB', new FacebookStrategy(facebookConfig, projectFacebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, assignmentGoogleStrategy));
    passport.use(new GoogleStrategy(googleConfig, projectGoogleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function assignmentFacebookStrategy(token, refreshToken, profile, done){
        database.assignment().userModel
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

    function projectFacebookStrategy(token, refreshToken, profile, done){
        database.project().userModel
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


    function assignmentGoogleStrategy(token, refreshToken, profile, done){
        database.assignment().userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
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

    function projectGoogleStrategy(token, refreshToken, profile, done){
        database.project().userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
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

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        if(user.type === "assignment")
        {
            database
                .assignment()
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

        else
        {
            database
                .project()
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


    }



    function assignmentLocalStrategy(username, password, done)
    {
        database
            .assignment()
            .userModel
            .findUserByUserName(username)
            .then(function(user){
                console.log(user);

                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            }, function(error){

                res.sendStatus(400).send(error);
            })

    }


    function projectLocalStrategy(username, password, done)
    {

        database
            .project()
            .userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                console.log(user);
                if(user && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            }, function(error){

                res.sendStatus(400).send(error);
            })
    }


    var api = {
        passportObject: passportObject,
        bcryptObject: bcryptObject

    };
    return api;

    function passportObject()
    {
        return passport;
    }

    function bcryptObject()
    {
        return bcrypt;
    }

};