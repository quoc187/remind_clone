const app = require("./backend/app");
const port = process.env.SERVER_PORT || 5000;

const sql = require("./backend/Database/db");
require("dotenv").config();
const db = sql.init();
if (db instanceof Error) {
  throw db;
}
app.set("port", port);
app.set("db", db.promise());
const sever = require("http").createServer(app);
const io = require("socket.io")(sever);
io.set("match origin protocol", true);
io.set("origins", "http://localhost:3000");
io.on("connection", (socket) => {
  socket.on("subscribe", (...rooms) => {
    for (const room of rooms) socket.join(room);
  });
  app.set("socket", socket);
  app.set("io", io);
  console.log(socket.id);
  socket.emit("hello", "HELLLO");
});
app.set("io", io);
sever.listen(port, () => {
  console.log("Listening at port", port);
});
