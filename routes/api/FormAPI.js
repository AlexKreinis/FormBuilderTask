const express = require("express");
const router = express.Router();

const FormUtils = require("../../utils/FormUtils");
const FindFormFieldsAndAddData = FormUtils.FindFormFieldsAndAddData;
const IncrementFormSubmits = FormUtils.IncrementFormSubmits;
const CreatingFormAndAddingFields = FormUtils.CreatingFormAndAddingFields;
const FindAndPopulateFormById = FormUtils.FindAndPopulateFormById;
const findFormAndPopulate = FormUtils.findFormAndPopulate;
const findAllForms = FormUtils.findAllForms;

const successMessage = "Success";
const ErrorMessage = "Error";
const auth = require("../../middleware/auth");

router.get("/getforms", auth, async (req, res) => {
  try {
    let AllForms = await findAllForms();
    res.json(AllForms);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});

router.get("/getform/:id", auth, async ({ params }, res) => {
  try {
    const forms = await findFormAndPopulate(params.id);
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});
router.put("/addformdata", auth, async ({ body }, res) => {
  try {
    let FormDataArray = Object.values(body.formData);
    await FindFormFieldsAndAddData(FormDataArray);
    await IncrementFormSubmits(body.id);
    res.status(200).json(successMessage);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});
router.post("/addfields", auth, async ({ body }, res) => {
  try {
    await CreatingFormAndAddingFields(body);
    res.status(200).json(successMessage);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});

router.get("/getformdata/:id", auth, async ({ params }, res) => {
  try {
    const forms = await FindAndPopulateFormById(params.id);
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(404).json("Error");
  }
});

module.exports = router;
