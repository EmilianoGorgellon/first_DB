let admin = require("firebase-admin");
let serviceAccount = require("./config/mocknormalizacion-firebase-adminsdk-jqmoy-3a772704f2.json");

const {config} = require("../../config");

if (config.db_name === "firebase") {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  const db = admin.firestore();
  
  module.exports = {db};
} 
