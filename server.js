const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');


const PORT = 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', userRouter);


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
    message: 'Server is running',
    author:"Clenz"
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
}); 