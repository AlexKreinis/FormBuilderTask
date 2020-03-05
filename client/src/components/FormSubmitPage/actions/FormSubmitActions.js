import axios from "axios";

export const AddFormData = async formData => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify(formData);
  try {
    let res = await axios.put(`/api/form/addformdata`, body, config);
    return res.data;
  } catch (err) {
    const ErrorMessage = "Error";
    if (err.response.status === 404) {
      return ErrorMessage;
    }
    return err.response.data;
  }
};
export const getForm = async id => {
  try {
    const res = await axios.get(`/api/form/getform/${id}`);
    return res.data;
  } catch (err) {
    const ErrorMessage = "Error";
    if (err.response.status === 404) {
      return ErrorMessage;
    }
    return err.response.data;
  }
};
