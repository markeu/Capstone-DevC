import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import apiRoutes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to TeamWork',
  });
});

app.use('/api/v1', apiRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`TeamWork started on port ${port}`);
});

export default app;
