const axios = require('axios');

module.exports = function(req, res, next) {
  try {
    const code = req.header('code');
    if (!code) {
        return res.status(401).json({ msg: 'No token,authorization denied' });
    }
    const data = {
        client_id: "e9f1e9e4962a75bb1f90",
        client_secret: "fbb9f446ba5a967f8d47ceed5799a7e6897dd6a4",
        code: token
      };   
      const config = {
          headers: {
            "Content-type": "application/json"
         }
       };
       const body = JSON.stringify(data);
       let res = await axios.post(`https://github.com/login/oauth/access_token`, body, config);
       next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
