const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://orgchart-dev:N4ODTG1B1JW9pK3e@hronboarding.nyxfn.mongodb.net/orgchart-dev?retryWrites=true&w=majority';
const connectToMongoDB = async () => {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = connectToMongoDB;
