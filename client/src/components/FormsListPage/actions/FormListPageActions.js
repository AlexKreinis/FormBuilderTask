import axios from "axios";

export const getAllForms = async () => {
  try {
    const res = await axios.get(`/api/form/getforms`);
    return res.data;
  } catch (err) {
    const ErrorMessage = "Error";
    if (err.response.status === 404) {
      return ErrorMessage;
    }
    return err.response.data;
  }
};
