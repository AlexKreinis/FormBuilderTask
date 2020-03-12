import axios from "axios";

export const LoginWithGithub = async code => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ code });

  try {
    let res = await axios.post(`/api/auth/login`, body, config);
    console.log("the res token is", res.data);
    localStorage.setItem("token", res.data);
    setAuthToken();
  } catch (err) {
    const ErrorMessage = "Error";
    if (err.response.status === 404) {
      return ErrorMessage;
    }
    return err.response.data;
  }
};

export const setAuthToken = token => {
  console.log("setting token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
