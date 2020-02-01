require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`\n *** Running on http://${host}:${port}\n`);
});
