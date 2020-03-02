const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  formName: {
    type: String,
    required: true
  },
  submits: {
    type: Number,
    default: 0
  },
  inputs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormFields"
    }
  ]
});

module.exports = Form = mongoose.model("Form", FormSchema);
