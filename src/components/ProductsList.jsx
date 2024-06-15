import { deleteProduct, getProductsList } from "../services/products.service";
import { useState, useEffect } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsList = await getProductsList();
      setProducts(productsList.data.products);
    };

    getProducts();
  }, []);

  const token = localStorage.getItem("authToken");

  return (
    <div>
      <p className="font-bold text-xl my-4 mx-2">Products:</p>
      <div className="flex justify-center items-center">
        <table className="border-2 border-green-500 w-full">
          <thead>
            <tr>
              <th className="border-b border-b-black">Product Name</th>
              <th className="border-b border-b-black">Email</th>
              <th className="border-b border-b-black">Status</th>
              <th className="border-b border-b-black">Expires At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">{val.name}</td>
                  <td className="text-center">{val.email}</td>
                  <td className="text-center">{val.status}</td>
                  <td className="text-center">{`${new Date(
                    val.expiresAt
                  ).getFullYear()}-${
                    new Date(val.expiresAt).getMonth() + 1
                  }-${new Date(val.expiresAt).getDate()}`}</td>
                  {token && (
                    <td
                      className="text-center text-red-500 cursor-pointer"
                      onClick={async () => {
                        await deleteProduct(val._id);
                        window.location.reload(false);
                      }}
                    >
                      DELETE
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
