const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const collection = () => getDB().collection('test');

exports.insertOne = async (req, res) => {
    const result = await collection().insertOne(req.body);
    res.json(result);
};

exports.insertMany = async (req, res) => {
    const result = await collection().insertMany(req.body);
    res.json(result);
};

exports.find = async (req, res) => {
    const users = await collection()
        .find({}, { projection: { name: 1, email: 1 } })
        .toArray();

    res.json(users);
};

exports.updateOne = async (req, res) => {
    const result = await collection().updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(result);
};

exports.updateMany = async (req, res) => {
    const result = await collection().updateMany(
        req.body.filter,
        { $set: req.body.update }
    );
    res.json(result);
};

exports.replaceOne = async (req, res) => {
    const result = await collection().replaceOne(
        { _id: new ObjectId(req.params.id) },
        req.body
    );
    res.json(result);
};

exports.deleteOne = async (req, res) => {
    const result = await collection().deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.json(result);
};

exports.deleteMany = async (req, res) => {
    const result = await collection().deleteMany(req.body);
    res.json(result);
};