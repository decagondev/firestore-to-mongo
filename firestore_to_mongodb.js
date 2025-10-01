const admin = require('firebase-admin');
const { MongoClient } = require('mongodb');

const serviceAccount = require('./path-to-your-firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'your_mongodb_database';
const collectionName = 'your_collection';

async function transferData() {
  try {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const mongoCollection = db.collection(collectionName);

    const collections = await firestore.getCollections();
    
    for (const collectionRef of collections) {
      const collectionName = collectionRef.id;
      console.log(`Processing Firestore collection: ${collectionName}`);
      
      const snapshot = await collectionRef.get();
      const documents = [];
      
      snapshot.forEach(doc => {
        documents.push({
          _id: doc.id,
          ...doc.data()
        });
      });
      
      if (documents.length > 0) {
        await mongoCollection.insertMany(documents);
        console.log(`Transferred ${documents.length} documents from ${collectionName} to MongoDB`);
      }
    }

    await client.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error transferring data:', error);
  }
}

transferData();
