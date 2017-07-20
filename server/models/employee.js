/**
 * Created by mohitgupta on 12/7/17.
 */
var db = require('../db');
exports.getAll = function(cb) {
    var collection = db.get().collection('employee')

    collection.find().toArray(function(err, docs) {
        cb(err, docs)
    })
}