import axios from "axios";

import { GETHISTORY } from "../utils/uris";

const getHistory = async () => {
  try {
    return await axios.get(GETHISTORY, {
      headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
    });
  } catch (err) {
    return err;
  }
};

export { getHistory };
