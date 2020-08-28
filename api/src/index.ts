import { createServer } from 'http';
import { config } from 'dotenv';

config();

import { app } from './app';

const port = process.env.PORT || 5000;

const server = createServer(app);

server.listen(port);

server.on('listening', () => console.log(`Server is running at port ${port}`));
server.on('error', console.log);
