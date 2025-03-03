const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connection = require("./config/db");
const userRoutes = require("./routes/user.route").router;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/users", userRoutes);

app.listen(PORT, async () => {
  try {
    await connection();
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
  console.log(`Server is running on port ${PORT}`);
});
