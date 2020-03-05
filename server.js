const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use("/api/form", require("./routes/api/FormAPI"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
