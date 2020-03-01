const express = require("express");
const router = express.Router();
const FormData = require("../../models/FormData");
const FormFields = require("../../models/FormFields");

router.get("/getforms", async (req, res) => {
  try {
    let AllFormFields = await FormFields.find();
    res.json(AllFormFields);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

router.get("/getform/:id", async ({ params }, res) => {
  try {
    formfields = await FormFields.findById(params.id);
    res.json(formfields);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});
router.put("/addformdata", async ({ body }, res) => {
  try {
    console.log("entered here\n");
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});
router.post("/addfields", async ({ body }, res) => {
  try {
    const form = new FormFields({
      fields: body.allInputsData,
      formName: body.formName
    });
    await form.save();
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

module.exports = router;
