const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("API RUNNING"));
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use("/api/form", require("./routes/api/FormAPI"));
