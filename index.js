const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');
require('dotenv').config();

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.use(errorMiddleware);

app.all('*', (_req, res, _next) => (
  res.status(404).json({ message: 'Route not found' })
));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
