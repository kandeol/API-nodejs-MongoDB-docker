const db = require("../models");
const User = db.user;



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