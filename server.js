require("dotenv").config(); // cargar variables .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos (HTML, JS, CSS)
app.use(express.static("public"));

// Variables desde .env
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const DB = process.env.MONGO_DB;
const PORT = process.env.PORT || 3000;

// Conexión segura a MongoDB con autenticación
const uri = `mongodb://${USER}:${PASS}@127.0.0.1:27017/${DB}?authSource=admin`;

// Conexión a Mongo
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

// Modelo
const UserSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

// ENDPOINTS API
app.post("/api/users", async (req, res) => {
  try {
    const nuevo = await User.create(req.body);
    res.json({ ok: true, data: nuevo });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
