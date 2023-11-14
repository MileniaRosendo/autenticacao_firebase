// auth.js
const firebase = require('firebase');
const config = require('.//workspaces/autenticacao_firebase/auth-firebase-70f47-firebase-adminsdk-mqz7l-75a9cf2dde.json');

 
firebase.initializeApp(config);

const auth = firebase.auth();

module.exports = auth;
