const db = require("../models");
const Options = db.option;

exports.initial = () => {
    Options.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Options({
                identifiant: "TR",
                description: "tout risque"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'TR' to Options collection");
            });

            new Options({
                identifiant: "VU",
                description: "vol uniquement"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'VU' to Options collection");
            });

            new Options({
                identifiant: "IU",
                description: "incendie uniquement"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'IU' to Options collection");
            });

            new Options({
                identifiant: "CV",
                description: "cambriole un vendredi"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'CV' to Options collection");
            });

            new Options({
                identifiant: "TC",
                description: "Toutes casses"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'TC' to Options collection");
            });
        }
    });
}