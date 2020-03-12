const axios = require("axios");
module.exports = async function(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    console.log("The token is", token);
    if (!token) {
      return res.status(404).json({ msg: "No token,authorization denied" });
    }
    axios.defaults.headers.common["Authorization"] = "token " + token;
    try {
      const res = await axios.get(`https://api.github.com/user`);
      console.log("res data is", res.data);
    } catch (err) {
      return res.status(404).json({ msg: "Invalid token" });
    }
    next();
  } catch (error) {}
};
