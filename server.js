require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes'); // Importando as rotas de location
const userRoutes = require('./routes/userRoutes'); // Importando as rotas de usuários

const app = express();
app.use(express.json());

// Rotas e middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', authRoutes);
app.use('/locations', locationRoutes); // Definindo as rotas de location
app.use('/', userRoutes); // Definindo as rotas de usuários

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
