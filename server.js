const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 5000;
const userRouter = require('../backend-nodejs/routers/userRouter')

app.use(express.json())
app.use(express.urlencoded({extends: true}));

const MONGODB_URI = 'mongodb+srv://curso:cursoniot2025@cursoniot.zrry5mh.mongodb.net/cursoDb?retryWrites=true&w=majority&appName=cursoniot';


// Conectar ao MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rota user
app.use('/api/user', userRouter)

// Rota GET simples
app.get('/', (req, res) => {
    
  return res.json({
    message: 'Server is running',
    author:"Clenz"
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
}); 