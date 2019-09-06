const uuid = require('uuid');
const utils = require('./utils');

module.exports.create = (event, context, callback, Model) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const timestamp = new Date().getTime();

    const newObject = new Model({
        ...event.body,
        id: uuid.v1(),
        createdAt: timestamp,
        updatedAt: timestamp,
    });

    newObject.save()
        .then((res) => callback(null, res))
        .catch(err => callback(err))
}

module.exports.update = (event, context, callback, Model) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.path.id;
    const timestamp = new Date().getTime();

    Model.update(id, { ...event.body, updatedAt: timestamp }, (err, res) => {
        callback(err, res);
    });
}

module.exports.getAll = (event, context, callback, Model) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const filter = event.query.filter ? (utils.safeParseJSON(event.query.filter) || {}) : {};
    var populates = filter.populates || [];
    var conditions = filter.conditions || {};
    var order = filter.order || { createdAt: -1 };
    var limit = filter.limit || 12;
    let lastKey = null;
    if (filter.lastKey) {
        lastKey = {
            "id": {
                "S": filter.lastKey,
            }
        }
    }
    Model
        .scan()
        .count()
        .exec((err, totalRecords) => {
            if (err) return callback(err);
            Model
                .scan(conditions)
                .limit(limit)
                .startAt(lastKey)
                .exec((err, res) => {
                    callback(err, {
                        data: res,
                        limit,
                        total: totalRecords[0],
                        lastKey: res.lastKey["id"]["S"],
                    });
                });
        });

    // const filter = event.query.filter ? (utils.safeParseJSON(event.query.filter) || {}) : {};
    // var populates = filter.populates || [];
    // var conditions = filter.conditions || {};
    // var order = filter.order || { createdAt: -1 };
    // var limit = filter.limit || 12;
    // var skip = filter.skip || 0;

    // // Make dynamic population
    // var evalPopulates = [];
    // if (populates.length > 0) {
    //     populates.forEach(populate => {
    //         evalPopulates.push(`populate(${JSON.stringify(populate)})`);
    //     });
    // }
    // connectToDatabase()
    //     .then(() => {
    //         Model.countDocuments({}).exec((err, count) => {
    //             if (err) return callback(err);

    //             return eval(`Model.find(conditions)${evalPopulates.length > 0 ? '.' : ''}
    //             ${evalPopulates.join('.')}
    //             .sort(order)
    //             .limit(limit)
    //             .skip(skip)
    //             .exec((err, models) => {
    //                 if (err) return callback(err);
    //                 callback(null, {
    //                     data: models,
    //                     limit,
    //                     skip,
    //                     total: count
    //                 })
    //             })`);
    //         });
    //     });
}