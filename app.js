import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).json({
  msg: 'welcome',
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app running on port ${PORT}`);
});
