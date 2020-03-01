import axios from "axios";

export const AddFormData = async (formName, allInputsData) => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ formName, allInputsData });
  try {
    let res = await axios.put(`/api/form/addformdata`, body, config);
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      return "Error";
    }
    return err.response.data;
  }
};
export const getForm = async id => {
  try {
    const res = await axios.get(`/api/form/getform/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      return "Error";
    }
    return err.response.data;
  }
};
