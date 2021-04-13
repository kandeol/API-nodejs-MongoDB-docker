const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'unkle-db'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb://api:docker1234@localhost:27017", clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}