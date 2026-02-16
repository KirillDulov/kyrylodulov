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

exports.findWithCursor = async (req, res) => {
    try {
        const cursor = collection().find({}, { projection: { name: 1, email: 1 } });
        const users = [];
        await cursor.forEach(user => users.push(user));
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const result = await collection().aggregate([
            {
                $group: {
                    _id: null,
                    avgAge: { $avg: "$age" },
                    totalUsers: { $sum: 1 },
                    uniqueNames: { $addToSet: "$name" }
                }
            },
            {
                $project: {
                    _id: 0,
                    avgAge: 1,
                    totalUsers: 1,
                    uniqueNamesCount: { $size: "$uniqueNames" }
                }
            }
        ]).toArray();

        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Помилка сервера', error: err.message });
    }
};