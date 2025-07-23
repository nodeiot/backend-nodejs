const express = require('express');
const userRouter = require('./routers/userRouter')
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter) 
//quando vier alguma requisicao, ele vai abrir as portas para o usuário

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