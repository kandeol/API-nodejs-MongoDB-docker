const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Contract = db.contract;
const Option = db.option;
var dateFormat = require("dateformat");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    console.log("user", user);

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {

                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            console.log("err3");

                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully by Admin!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "client" }, (err, role) => {
                if (err) {

                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {

                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.getAllInfosUsers = async (req, res) => {

    const cursor = User.find().cursor();
    let allDoc = [];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        let info = {
            username: doc.username,
            email: doc.email
        }
        allDoc.push(info);
        console.log("document", doc);
    }
    console.log(allDoc)
    res.status(200).send(allDoc);
    return;
};

exports.getAllInfosContracts = async (req, res) => {

    const cursor = Contract.find().cursor();
    let allDoc = [];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        allDoc.push(doc);
        console.log("document", doc);
    }
    console.log(allDoc)
    res.status(200).send(allDoc);
    return;
};

exports.deleteUser = async (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        User.deleteOne({ username: req.body.username }).then(() => {
            res.status(200).send("User delete");
        }).catch((error) => {
            res.status(500).send("ERROR", error);
            return;
        })
    })
};

exports.createContract = async (req, res, next) => {
    const contract = new Contract({

    });
    const now = dateFormat(new Date(), "mm-dd-yyyy");
    if (req.body.start_date) {
        console.log("date1", now);
        contract.start_date = req.body.start_date;
    } else {
        contract.start_date = now;
    }

    if (req.body.start_date > now) {
        contract.status = "pending"
    } else {
        if (req.body.end_date < Date.now()) {
            contract.status = "finished"
        }
        contract.status = "active"
    }

    if (req.body.client) {
        // verification que le client existe 
        await User.find({
            username: req.body.client,
        }).then(async (users) => {
            if (!users) {
                console.log("users no found !")
            } else {
                console.log("client!", users);

                contract.client = users.map(user => {
                    // verification que l'user enregsitrer dans le contrat est bien un client

                    // Role.find(
                    //     {
                    //         _id: { $in: user.roles }
                    //     },
                    //     (err, roles) => {
                    //         if (!err) {
                    //             res.status(500).send({ message: "ERROR TEST" });
                    //             return;
                    //         }

                    //         for (let i = 0; i < roles.length; i++) {
                    //             if (roles[i].name === "admin") {
                    //                 res.status(403).send({ message: "Only client can subscribe to contract!" });
                    //                 return;
                    //             }
                    //         }
                    //     }
                    // );
                    return user._id
                }
                );
                console.log("CONTRAT---CLIENT", contract.client);

                if (req.body.options) {
                    console.log("option!", req.body.options);

                    await Option.find({
                        identifiant: req.body.options,
                    }).then((options) => {
                        if (!options) {
                            console.log("options no found !")
                        } else {
                            console.log("option!2--", options);

                            contract.options = options.map(option => option._id);

                        }
                    })

                    // on verifie que le client n'a pas deja souscrit a ces options
                    await contract.save((err, result) => {
                        console.log("RESULT", result);
                        if (err) {
                            res.status(500).send("ERROR", error);
                            return;
                        }
                        contract.client.map(cli => {
                            console.log("CLI", cli)

                            User.updateOne({
                                _id: cli,
                            }, {
                                $push: {
                                    contracts: result._id
                                    , options: contract.options
                                }
                            }
                                , (err) => {
                                    if (err) {
                                        console.log(`Error: ` + err)
                                    }
                                });
                        });

                        console.log("LAST----");
                        res.status(200).send("Contract create !");
                    })

                }

            }
        });
        console.log("Contract --------------", contract);
    }
};
