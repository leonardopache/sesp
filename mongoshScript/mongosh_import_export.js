const fs = require('fs');
const { execSync } = require('child_process');

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    print("Usage: mongosh --file export_import.js <remoteUri> <remoteDb>");
    quit();
}

const remoteUri = `mongodb://${args[0]}`;  // Remote MongoDB connection URI (without +srv)
const remoteDb = args[1];   // Remote Database Name
const localDb = "yourLocalDb"; // Change this if needed
const localUri = "mongodb://localhost:27017/" + localDb;
const exportPath = "./exports"; // Directory for exported JSON files

// Ensure export directory exists
if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath);
}

// Connect to remote MongoDB
const conn = new Mongo(remoteUri);
const db = conn.getDB(remoteDb);

// Get all collection names
const collections = db.getCollectionNames();

// Export each collection
collections.forEach(collection => {
    const exportFile = `${exportPath}/${collection}.json`;
    print(`Exporting ${collection}...`);
    const exportCmd = `mongoexport --uri="${remoteUri}" --db="${remoteDb}" --collection="${collection}" --out="${exportFile}" --jsonArray`;
    execSync(exportCmd, { stdio: 'inherit' });
});

// Import into local MongoDB
collections.forEach(collection => {
    const importFile = `${exportPath}/${collection}.json`;
    print(`Importing ${collection}...`);
    const importCmd = `mongoimport --uri="${localUri}" --collection="${collection}" --file="${importFile}" --jsonArray --drop`;
    execSync(importCmd, { stdio: 'inherit' });
});

print("Data migration completed.");
