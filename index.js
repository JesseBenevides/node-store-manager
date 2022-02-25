const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productRouter = require('./routes/productRouter');
require('dotenv').config();

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
