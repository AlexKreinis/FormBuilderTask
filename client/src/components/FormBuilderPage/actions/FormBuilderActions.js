import axios from "axios";

export const AddFormFields = async (formName, allInputsData) => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ formName, allInputsData });
  try {
    let res = await axios.post(`/api/form/addfields`, body, config);
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      return "Error";
    }
    return err.response.data;
  }
};
