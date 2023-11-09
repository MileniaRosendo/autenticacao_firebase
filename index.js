const admin = require("firebase-admin");
const serviceAccount = require("auth-firebase-70f47-firebase-adminsdk-mqz7l-75a9cf2dde.json");
const express = require("express");
const app = express();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "auth-firebase-70f47.firebaseapp.com"
});


const isAuthenticated = (req, res, next) => {
    const idToken = req.header("Authorization");
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        res.status(401).json({ error: "Token de autenticação inválido" });
      });
  };
  
  // Rota protegida
  app.get("/protegido", isAuthenticated, (req, res) => {
    res.json({ message: "Esta rota é protegida!" });
  });
  
  app.listen(3000, () => {
    console.log("Servidor Express rodando na porta 3000");
  });
  
