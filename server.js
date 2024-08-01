const express = require('express');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(express.json());

// Rotas e middlewares

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Iniciar o servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
