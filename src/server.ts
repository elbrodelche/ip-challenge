import app from './app';
import * as process from 'process';

const port = process.env.NODE_PORT || 3000;
const server = app.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);

export default server;
