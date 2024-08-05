require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Rotas e middlewares

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', authRoutes); 

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
