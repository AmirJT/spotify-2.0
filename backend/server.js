require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:3001", 
    "https://spotifyplaylistgenerator2.netlify.app"
  ],
  credentials: true, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); 

app.use("/api/auth", require("./routes/auth"));
app.use("/api/playlist", require("./routes/playlist"));
app.use("/api/spotify", require("./routes/spotify"));
console.log("Routes loaded");

sequelize.authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync();
  })
  .then(() => console.log("Models synced with the database."))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});