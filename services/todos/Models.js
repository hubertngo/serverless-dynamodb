const dynamoose = require('dynamoose');

const Todo = dynamoose.model('Todo', {
    id: String,
    name: String,
    desc: String,
    createdAt: Number,
    updatedAt: Number,
});

module.exports.Todo = Todo;