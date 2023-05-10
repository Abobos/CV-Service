import { createServer } from "http";
import app from "./app";

const port = 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
