// auth.js
const firebase = require('firebase-admin');
const config = require('./auth-firebase-70f47-firebase-adminsdk-mqz7l-75a9cf2dde.json');

firebase.initializeApp({
  credential: firebase.credential.cert(config),
});

const auth = firebase.auth();

module.exports = auth;
