const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormFieldsSchema = new Schema({
  formName: {
    type: String,
    required: true
  },
  fields: [
    {
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
      inputData: {
        type: mongoose.Schema.ObjectId,
        ref: "UserData"
      }
    }
  ],
  submits: {
    type: Number,
    default: 0
  }
});

module.exports = FormFields = mongoose.model("FormFields", FormFieldsSchema);
