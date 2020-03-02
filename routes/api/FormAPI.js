const express = require("express");
const router = express.Router();
const FormData = require("../../models/FormData");
const FormFields = require("../../models/FormFields");
const Form = require("../../models/Form");

router.get("/getforms", async (req, res) => {
  try {
    let AllForms = await Form.find();
    res.json(AllForms);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

router.get("/getform/:id", async ({ params }, res) => {
  try {
    const forms = await Form.findById(params.id).populate("inputs");
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});
router.put("/addformdata", async ({ body }, res) => {
  try {
    let arr = Object.values(body.formData);
    for (let index = 0; index < arr.length; index++) {
      const formfields = await FormFields.findById(arr[index].refId);
      const formdata = new FormData({
        value: arr[index].value
      });
      formdataId = await formdata.save();
      formfields.inputData.push(formdataId._id);
      await formfields.save();
    }
    await Form.findByIdAndUpdate(
      body.id,
      { $inc: { submits: 1 } },
      { new: true }
    );
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});
router.post("/addfields", async ({ body }, res) => {
  try {
    const form = new Form({
      formName: body.formName
    });
    for (let index = 0; index < body.allInputsData.length; index++) {
      const inputs = new FormFields({
        fieldLabel: body.allInputsData[index].fieldLabel,
        inputName: body.allInputsData[index].inputName,
        inputType: body.allInputsData[index].inputType
      });
      let inputsId = await inputs.save();
      form.inputs.push(inputsId._id);
    }
    await form.save();
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

router.get("/getformdata/:id", async ({ params }, res) => {
  try {
    const forms = await Form.findById(params.id).populate({
      path: "inputs",
      model: "FormFields",
      populate: {
        path: "inputData",
        model: "FormData"
      }
    });
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

module.exports = router;
