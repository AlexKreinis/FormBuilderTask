import axios from "axios";

export const getAllForms = async () => {
  try {
    const res = await axios.get(`/api/form/getforms`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      return "Error";
    }
    return err.response.data;
  }
};
