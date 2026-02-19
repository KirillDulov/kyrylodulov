const Test = require('../models/Test');

exports.insertOne = async (req, res, next) => {
    try {
        const doc = await Test.create(req.body);
        res.status(201).json(doc);
    } catch (err) {
        next(err);
    }
};

exports.insertMany = async (req, res, next) => {
    try {
        const docs = await Test.insertMany(req.body, { ordered: false });
        res.status(201).json(docs);
    } catch (err) {
        next(err);
    }
};

exports.find = async (req, res, next) => {
    try {
        const docs = await Test.find().select('name age');
        res.json(docs);
    } catch (err) {
        next(err);
    }
};

exports.updateOne = async (req, res, next) => {
    try {
        const doc = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(doc);
    } catch (err) {
        next(err);
    }
};

exports.updateMany = async (req, res, next) => {
    try {
        const result = await Test.updateMany(
            req.body.filter,
            { $set: req.body.update },
            { runValidators: true }
        );

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.replaceOne = async (req, res, next) => {
    try {
        const doc = await Test.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(doc);
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const doc = await Test.findByIdAndDelete(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};

exports.deleteMany = async (req, res, next) => {
    try {
        const result = await Test.deleteMany(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.findWithCursor = async (req, res, next) => {
    try {
        const cursor = Test.find().select('name age').cursor();
        const docs = [];

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            docs.push(doc);
        }

        res.json(docs);
    } catch (err) {
        next(err);
    }
};

exports.getStats = async (req, res, next) => {
    try {
        const result = await Test.aggregate([
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
        ]);

        res.json(result[0] || {});
    } catch (err) {
        next(err);
    }
};