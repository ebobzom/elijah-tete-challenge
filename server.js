import app from './app';

// This is set here to prevent Jest running instance from colliding with express app

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app running on port ${PORT}`);
});
