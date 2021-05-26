const db = require("../models");
const User = db.user;
const Role = db.role;
const Contract = db.contract;
const Option = db.option;
var dateFormat = require("dateformat");
var bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
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
    }
    res.status(200).send(allDoc);
    return;
};

exports.getAllInfosContracts = async (req, res) => {

    const cursor = Contract.find().cursor();
    let allDoc = [];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        allDoc.push(doc);
    }
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
    const contract = new Contract({});
    const now = dateFormat(new Date(), "mm-dd-yyyy");
    if (req.body.start_date) {
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

    if (req.body.options.length > 0) {
        let checkError = false;
        await Option.find({
            identifiant: req.body.options,
        }).then((options) => {
            if (options.length === 0) {
                checkError = true;
                return;
            } else {
                contract.options = options.map(option => option._id);
            }
        }).catch(err => {
            if (err) {
                console.log(`Error db: ` + err)
            }
        })
        if (checkError) {
            res.status(500).send({ message: "OPTION NO FOUND !" });
            return;
        }
    } else {
        res.status(500).send("Pas d'options dans la demande de contrat");
        return;

    }


    if (req.body.client.length > 0) {
        // verification que le client existe 
        let checkError = "";
        await User.find({
            username: req.body.client,
        }).then(async (users) => {
            if (users.length === 0) {
                res.status(500).send({ message: "users no found !" });
                return
            } else {
                contract.client = users.map(user => {
                    // on verifie que le client n'a pas deja souscrit a ces options
                    const found = user.options.some(r => contract.options.indexOf(r) >= 0);
                    if (found) {
                        checkError = "Le/les client(s) possedent deja ces options";
                    }
                    return user._id;
                });

                if (!checkError) {
                    await contract.save((err, result) => {
                        if (err) {
                            res.status(500).send("ERROR", error);
                            return;
                        }
                        // Update des documents User => Contrats et Options
                        contract.client.map(cli => {
                            User.updateOne({
                                _id: cli,
                            }, {
                                $push: {
                                    contracts: result._id
                                    , options: result.options
                                }
                            }
                                , (err) => {
                                    if (err) {
                                        console.log(`Error db: ` + err)
                                    }
                                });
                        });
                    })
                }
            }
        }).catch(err => {
            res.status(500).send("ERROR", err);
            return;
        });
        if (!checkError) {
            res.status(200).send("Contract create !");
            return
        } else {
            res.status(404).send(checkError);
            return
        }
    } else {
        res.status(500).send("Pas de client dans la demande de contrat");
        return;
    }
};
