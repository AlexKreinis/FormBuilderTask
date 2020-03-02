const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormFieldsSchema = new Schema({
  fieldLabel: {
    type: String,
    required: true
  },
  inputName: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  inputData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormData"
    }
  ]
});

module.exports = FormFields = mongoose.model("FormFields", FormFieldsSchema);
