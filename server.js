const express = require('express');
const app = express();
const PORT = 5000;
const userRouter = require('../backend-nodejs/routers/userRouter')

app.use(express.json())
app.use(express.urlencoded({extends: true}));

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