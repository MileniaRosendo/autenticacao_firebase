const express = require('express');
const auth = require('./auth');

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    res.json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.createUser({
      email,
      password,
    });
    const user = userCredential.user;
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

app.get('/logout', (req, res) => {
  auth
    .signOut()
    .then(() => {
      res.json({ message: 'Logout bem-sucedido' });
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
