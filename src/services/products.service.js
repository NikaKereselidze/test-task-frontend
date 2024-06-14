import axios from "axios";

import { GETPRODUCTSLIST, ADDPRODUCT, DELETEPRODUCT } from "../utils/uris";

const getProductsList = async () => {
  try {
    return await axios.get(GETPRODUCTSLIST);
  } catch (err) {
    return err;
  }
};

const addProduct = async (name, email, expiresAt) => {
  try {
    return await axios.post(
      ADDPRODUCT,
      {
        name,
        email,
        expiresAt,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      }
    );
  } catch (err) {
    return err;
  }
};

const deleteProduct = async (productId) => {
  try {
    return await axios.delete(DELETEPRODUCT, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      params: { productId },
    });
  } catch (err) {
    return err;
  }
};

export { getProductsList, addProduct, deleteProduct };
