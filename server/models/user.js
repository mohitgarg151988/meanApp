/**
 * Created by mohitgupta on 13/7/17.
 */
var db = require('../db');
var utils  = require('./utils');

exports.getByUserName = function(userName, cb) {
    var collection = db.get().collection('users')
    collection.find({userName:userName}).toArray(function(err, docs) {
        cb(err, docs)
    })
}

exports.authenticate = function (name, pass, fn) {
    console.log('authenticating %s:%s', name, pass);
    var collection = db.get().collection('users')
    collection.findOne({
        userName: name
    },function (err, user) {
        if (user) {
            utils.getSaltHashPassword(pass, user.hashSalt, function (hash) {
                if (hash.passwordHash == user.passwordHash) return fn(null, user);
                return fn('Invalid password',null);
            });
        } else {
            return fn('Can not find user');
        }
    });
}

exports.registeration = function (data, fn) {
    var collection = db.get().collection('users')
    collection.findOne({
        userName: data.userName
    },function (err, user) {
        if (user) {
            return fn('User already exists with User Name '+ data.userName);
        } else {
            return utils.getSaltHashPassword(data.password, null, function (hash) {
                var user = collection.insertOne( {
                     name : data.name,
                     userName : data.userName,
                     birthDate : "2012-10-20",
                     country : data.country,
                     gender : data.gender,
                     passwordHash : hash.passwordHash,
                     hashSalt : hash.salt
                });
                fn(null, user);
            });
        }
    });
}