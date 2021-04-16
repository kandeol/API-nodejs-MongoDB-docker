const db = require("../models");
const User = db.user;
const Contract = db.contract;


// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };

exports.getInfosClient = (req, res) => {
    User.findOne({ _id: req.userId }).then((user) => {
        res.status(200).send({
            username: user.username,
            email: user.email,
        });
    }).catch((err) => {
        res.status(500).send({ message: err });
        return;

    })
};

exports.getInfosContracts = async (req, res) => {
    var allDoc = []

    await User.findOne({ _id: req.userId }).then((user) => {
        allDoc = user.contracts.map(el => el);
    }).catch((err) => {
        res.status(500).send({ message: " error find user" });
        return;
    })

    const cursor = Contract.find({ _id: allDoc }).cursor();
    let allDoc2 = [];

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        allDoc2.push(doc);
    }
    console.log("alldoc2----------", allDoc2);
    res.status(200).send(allDoc2);
    return;


};