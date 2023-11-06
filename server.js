const { MongoClient } = require('mongodb');
const axios = require('axios');

const url = 'mongodb+srv://orgchart-dev:N4ODTG1B1JW9pK3e@hronboarding.nyxfn.mongodb.net/orgchart-dev?retryWrites=true&w=majority';

const fetchAndConvertImages = async () => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('orgchart-dev');
        const collection = database.collection('copyofempmaster');

        let offset = 0;
        const limit = 1000;

        while (true) {
            const imagePaths = await collection.find({}, { projection: { ImagePath: 1 } })
 .toArray();

            if (imagePaths.length === 0) {
                break; 
            }

            for (const { ImagePath } of imagePaths) {
                const response = await axios.get(ImagePath, { responseType: 'arraybuffer' });

                if (response.status === 200) {
                    const base64 = Buffer.from(response.data, 'binary').toString('base64');
                    await collection.updateOne({ ImagePath }, { $set: { ImagePath: base64 } });
                }
            }

            // offset += limit;
        }
    } catch (error) {
        console.error('Error', error);
    }
};

fetchAndConvertImages();
