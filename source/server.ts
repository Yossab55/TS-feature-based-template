import app from "./app.js";
import serverConfig from "./config/server.js";
import { connectMongoDB } from "./database/mongo.js";

const PORT = serverConfig.port;
const HOST = serverConfig.host;

await connectMongoDB();

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
