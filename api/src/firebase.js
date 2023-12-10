var admin = require('firebase-admin');

var serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATEBASE_URL,
});

module.exports = admin;
