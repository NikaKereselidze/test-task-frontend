import { getMe } from "../services/auth.service";
import { useState, useEffect } from "react";

export default function Header({ tab, url }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getMyData = async () => {
      if (localStorage.getItem("authToken")) {
        const user = await getMe();
        setUserData(user.data.user);
      }
    };
    getMyData();
  }, []);

  const token = localStorage.getItem("authToken");

  return (
    <div className="flex flex-row justify-between border-b border-gray-150 p-4">
      <div className="flex flex-row items-center">
        <a href={url}>{tab}</a>
      </div>
      <div className="flex flex-row items-center">
        <a href={!token ? "/signin" : "/add"}>Add Product</a>
      </div>
      <div className="flex flex-row items-center">
        {!token ? (
          <div className="flex flex-row">
            <a href="/signin">Sign In</a>
            <a href="/signup" className="ml-4">
              Sign Up
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p>{userData.email}</p>
            <p
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.reload(false);
              }}
            >
              Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
