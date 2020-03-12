const express = require("express");
const router = express.Router();

const FormUtils = require("../../utils/FormUtils");
const findAllForms = FormUtils.findAllForms;

const successMessage = "Success";
const ErrorMessage = "Error";
const auth = require("../../middleware/auth");
const axios = require("axios");

router.post("/login", async (req, res) => {
  console.log("entered\n");
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({
    code: req.body.code,
    client_id: "e9f1e9e4962a75bb1f90",
    client_secret: "fbb9f446ba5a967f8d47ceed5799a7e6897dd6a4"
  });
  try {
    let githubans = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      config
    );
    temp = githubans.data;
    let access_token = temp.split("=");
    let token = access_token[1].split("&");
    res.json(token[0]);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});

module.exports = router;
