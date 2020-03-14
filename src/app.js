import express from 'express';
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import 'dotenv/config';

import apiRoutes from './routes';


const app = express();

app.use(cors());
app.use(expressFileUpload({
  createParentPath: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to TeamWork',
  });
});

app.use('/api/v1', apiRoutes);


const port = process.env.PORT ||5000;
app.listen(port, () => {
  console.log(`TeamWork started on port ${port}`);
});

export default app;
