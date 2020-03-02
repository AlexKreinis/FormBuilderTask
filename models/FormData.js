const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormDataSchema = new Schema({
  value: { type: String, required: true }
});
module.exports = FormData = mongoose.model("FormData", FormDataSchema);
