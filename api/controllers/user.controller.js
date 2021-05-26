const db = require("../models");
const User = db.user;
const Contract = db.contract;

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
    var allDocContracts = []

    await User.findOne({ _id: req.userId }).then((user) => {
        allDocContracts = user.contracts.map(el => el);
    }).catch((err) => {
        res.status(500).send({ message: " error find user" });
        return;
    })

    const cursor = Contract.find({ _id: allDocContracts }).cursor();
    let allDocContractInfo = [];

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        allDocContractInfo.push(doc);
    }
    res.status(200).send(allDocContractInfo);
    return;


};