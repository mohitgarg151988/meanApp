/**
 * Created by mohitgupta on 13/7/17.
 */
var db = require('../db');
var utils  = require('./utils');
exports.getByUserName = function(userName, cb) {
    var collection = db.get().collection('users')
    collection.find({"name":userName}).toArray(function(err, docs) {
        cb(err, docs)
    })
}

exports.authenticate = function (name, pass, fn) {
    console.log('authenticating %s:%s', name, pass);
    var collection = db.get().collection('users')
    collection.findOne({
        name: name
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