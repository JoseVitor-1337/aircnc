const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const { port, mongodb_local_url } = require("./config/enviroment");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose
  .connect(mongodb_local_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Conexão com MongoDB foi um sucesso!`);
  })
  .catch((error) => {
    console.log(`Houve um erro: ${error}`);
  });

// Em produção, o ideal seria usar o Banco de dados chamado "Redis"
const connectedUsers = {};

// Vai saber quem está connectado ao servidor, seja pela WEB ou Mobile
io.on("connection", (socket) => {
  const { user_id } = socket.handshake.query;

  console.log(`Usuário ${user_id} está connectado ao servidor`);

  connectedUsers[user_id] = socket.id;
});

// Middleware usado junto ao socket.io para passar os usuário conectados para todas aplicação
app.use((req, res, next) => {
  // Impressionante, passando via requisição novos objetos para todas as rotas, assim qualquer
  // aplicação pode usar estes objetos
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(port, console.log(`O Servidor está ouvindo na porta: ${port}`));
