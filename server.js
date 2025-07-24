const express = require('express');
const app = express();
const PORT = 5000;

// Rota POST simples
app.post('/', (req, res) => {
 
  return res.json({
    message: 'Server is running',
    author:"Clenz"
  });
});


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