const ModelName = require('./constant').ModelName;
require('dotenv').config()
const MyController = require('./MyController');
const Models = require('./Models');
const Model = Models.Todo;

module.exports.create = (event, context, callback) => {
    return MyController.create(event, context, callback, Model, ModelName);
};

module.exports.get = (event, context, callback) => {
    return MyController.getOne(event, context, callback, Model, ModelName);
};

module.exports.list = (event, context, callback) => {
    return MyController.getAll(event, context, callback, Model, ModelName);
};

module.exports.update = (event, context, callback) => {
    return MyController.update(event, context, callback, Model, ModelName);
};

module.exports.delete = (event, context, callback) => {
    return MyController.delete(event, context, callback, Model, ModelName);
};
