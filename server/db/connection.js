import { MongoClient, ServerApiVersion } from 'mongodb';

let client;
let db;

const connectDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.ATLAS_URI || "";
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    db = client.db('tasks');
    
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
