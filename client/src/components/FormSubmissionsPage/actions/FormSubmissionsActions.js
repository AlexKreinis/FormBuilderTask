import axios from "axios";

export const getFormData = async id => {
  try {
    const res = await axios.get(`/api/form/getformdata/${id}`);
    return res.data;
  } catch (err) {
    console.log("error here");
    console.log(err);
    if (err.response.status === 404) {
      return "Error";
    }
    return err.response.data;
  }
};
