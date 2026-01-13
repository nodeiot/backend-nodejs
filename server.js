const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter'); //importa o userRouter

//instancia app e porta
const app = express(); 
const PORT = 5000;

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://curso:cursoniot2025@cursoniot.zrry5mh.mongodb.net/cursoDb?retryWrites=true&w=majority&appName=cursoniot';
//declarando a url

// Conectar ao MongoDB(banco), sempre igual
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//para dizer quando roda ele, se conecta ou não
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

//config. para dizer se é json ou xml, etc
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//quando vier alguma requisicao, ele vai abrir as portas para o usuário
//rotas, aquilo que está definido, quando bater nesta info. ele vai 
//app.use('/api/livros', LivrosRouter)
app.use('/api/user', userRouter) 

// Rota GET simples, padrão
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