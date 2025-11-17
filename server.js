const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Bitnami (LOCAL)
mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

// Esquema simple
const UserSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// Rutas
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
