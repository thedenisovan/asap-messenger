import 'dotenv/config.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Listening on port ${PORT}`);
});
