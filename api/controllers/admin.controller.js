const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

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
            Role.findOne({ name: "user" }, (err, role) => {
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