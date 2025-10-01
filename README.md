# Firestore to MongoDB Data Transfer

This project provides a Node.js script to transfer data from a Firebase Firestore database to a MongoDB collection, using environment variables for configuration.

## Prerequisites

- Node.js (v14 or higher)
- A Firebase project with Firestore enabled
- A MongoDB instance (local or cloud)
- Firebase service account credentials JSON

## Installation

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with the following:
   ```env
   FIREBASE_SERVICE_ACCOUNT='{"type": "service_account", ...}'
   MONGO_URL=mongodb://localhost:27017
   MONGO_DB_NAME=your_mongodb_database
   MONGO_COLLECTION_NAME=your_collection
   ```
   Replace `FIREBASE_SERVICE_ACCOUNT` with your Firebase service account JSON (as a single-line string).

## Configuration

The script uses environment variables from the `.env` file:
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (stringified)
- `MONGO_URL`: MongoDB connection string (e.g., `mongodb://localhost:27017` or cloud URI)
- `MONGO_DB_NAME`: MongoDB database name
- `MONGO_COLLECTION_NAME`: Target MongoDB collection name

## Usage

Run the script to transfer data:
```bash
node firestore_to_mongodb.js
```

The script will:
1. Connect to Firestore and MongoDB using environment variables
2. Read all collections from Firestore
3. Transfer documents to the specified MongoDB collection
4. Preserve Firestore document IDs as MongoDB `_id` fields

## Notes

- Ensure your Firebase service account has read permissions for Firestore
- Ensure your MongoDB user has write permissions
- For large datasets, consider adding batch processing
- Check console output for transfer progress and errors
- Keep your `.env` file secure and do not commit it to version control

## Dependencies

- `firebase-admin`: For Firestore access
- `mongodb`: MongoDB Node.js driver
- `dotenv`: For environment variable management

## License

MIT License
