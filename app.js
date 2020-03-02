import express from 'express';
import bodyParser from 'body-parser';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to CapstoneDev-C',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`CapstoneDev-C started on port ${port}`);
});

export default app;
