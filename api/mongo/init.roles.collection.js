const db = require("../models");
const Role = db.role;

exports.initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "client"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'client' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}