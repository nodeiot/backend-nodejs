const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter')
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRouter) //camadas de redirecionamentos pra rotas ali dentro


// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://curso:cursoniot2025@cursoniot.zrry5mh.mongodb.net/cursoDb?retryWrites=true&w=majority&appName=cursoniot';

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rota GET simples
app.get('/', (req, res) => {
    
  return res.json({
    message: 'get ta rodando fininho',
    author:"blablabla"
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
}); 