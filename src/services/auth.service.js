import axios from "../api/axios";

import { SIGNIN, SIGNUP, GETME } from "../utils/uris";

const signUpUser = async (email, password) => {
  try {
    return await axios.post(SIGNUP, { email, password });
  } catch (err) {
    return err;
  }
};

const signInUser = async (email, password) => {
  try {
    return await axios.post(SIGNIN, {
      email,
      password,
    });
  } catch (err) {
    return err;
  }
};

const getMe = async () => {
  try {
    return await axios.get(GETME, {
      headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
    });
  } catch (err) {
    return err;
  }
};

export { signInUser, signUpUser, getMe };
