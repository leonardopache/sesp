const fs = require('fs');
const { execSync } = require('child_process');

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node export_import.js <remoteUri> <remoteDb>");
    process.exit(1);
}

const remoteUri = args[0];  // Remote MongoDB connection URI
const remoteDb = args[1];   // Remote Database Name
const localDb = "yourLocalDb"; // Change this if needed
const localUri = "mongodb://localhost:27017/" + localDb;
const exportPath = "./exports"; // Directory for exported JSON files

// Ensure export directory exists
if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath);
}

// Get all collections using mongo shell command
console.log("Fetching collections...");
const getCollectionsCmd = `mongosh "${remoteUri}/${remoteDb}" --quiet --eval "printjson(db.getCollectionNames())"`;
const collectionsOutput = execSync(getCollectionsCmd, { encoding: 'utf-8' });
const collections = JSON.parse(collectionsOutput.match(/\[.*\]/s)[0]); // Extract array from output

console.log(`Collections found: ${collections.join(", ")}`);

// Export each collection
collections.forEach(collection => {
    const exportFile = `${exportPath}/${collection}.json`;
    console.log(`Exporting ${collection}...`);
    const exportCmd = `mongoexport --uri="${remoteUri}" --db="${remoteDb}" --collection="${collection}" --out="${exportFile}" --jsonArray`;
    execSync(exportCmd, { stdio: 'inherit' });
});

// Import into local MongoDB
collections.forEach(collection => {
    const importFile = `${exportPath}/${collection}.json`;
    console.log(`Importing ${collection}...`);
    const importCmd = `mongoimport --uri="${localUri}" --collection="${collection}" --file="${importFile}" --jsonArray --drop`;
    execSync(importCmd, { stdio: 'inherit' });
});

console.log("Data migration completed.");
