const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const agendamentoRoutes = require('./routes/agendamentos');
const servicoRoutes = require('./routes/servicos');
const usuarioRoutes = require('./routes/usuarios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/agendamentos', agendamentoRoutes);
app.use('/servicos', servicoRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
