const express = require('express');
const userRouter = require('./routers/userRouter')
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRouter) //camadas de redirecionamentos pra rotas ali dentro


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