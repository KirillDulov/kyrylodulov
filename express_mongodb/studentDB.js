db.createCollection("assignments");

db.assignments.insertMany([
    { name: "Kirill", subject: "Math", score: 90 },
    { name: "Petro", subject: "Physics", score: 78 },
    { name: "Danilo", subject: "Chemistry", score: 85 },
    { name: "Diana", subject: "Biology", score: 92 },
    { name: "Kateryna", subject: "Math", score: 70 }
]);

db.assignments.find({ score: { $gt: 80 } });

db.assignments.updateOne(
    { score: { $lt: 85 } },
    { $inc: { score: 5 } }
);

db.assignments.find().sort({ score: 1 }).limit(1).forEach(doc => {
    db.assignments.deleteOne({ _id: doc._id })
});





