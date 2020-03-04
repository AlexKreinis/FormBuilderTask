const FormData = require("../models/FormData");
const FormFields = require("../models/FormFields");
const Form = require("../models/Form");

const FindFormFieldsAndAddData = async FormDataArray => {
  for (let index = 0; index < FormDataArray.length; index++) {
    const formfields = await FormFields.findById(FormDataArray[index].refId);
    const formdata = new FormData({
      value: FormDataArray[index].value
    });
    formdataId = await formdata.save();
    formfields.inputData.push(formdataId._id);
    await formfields.save();
  }
};

const IncrementFormSubmits = async id => {
  await Form.findByIdAndUpdate(id, { $inc: { submits: 1 } }, { new: true });
};

const CreatingFormAndAddingFields = async body => {
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
};

const FindAndPopulateFormById = async id => {
  const foundForms = await Form.findById(id).populate({
    path: "inputs",
    model: "FormFields",
    populate: {
      path: "inputData",
      model: "FormData"
    }
  });
  return foundForms;
};

const findFormAndPopulate = async id => {
  const foundForm = await Form.findById(id).populate("inputs");
  return foundForm;
};

const findAllForms = async () => {
  const allforms = await Form.find();
  return allforms;
};

module.exports = {
  FindFormFieldsAndAddData,
  IncrementFormSubmits,
  CreatingFormAndAddingFields,
  FindAndPopulateFormById,
  findFormAndPopulate,
  findAllForms
};
