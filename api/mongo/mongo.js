const mongoose = require('mongoose');
const initRoles = require('./init.roles.collection');

const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'unkle-db'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb://api:docker1234@localhost:27017", clientOptions)
        console.log('Connected');
        initRoles.initial();
    } catch (error) {
        console.log(error);
        throw error;
    }
}