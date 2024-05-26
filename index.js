import server from './src/apps/server.js';

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server is listening at port: ${PORT}`));
