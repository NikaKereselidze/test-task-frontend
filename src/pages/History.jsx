import "react-calendar/dist/Calendar.css";
import { getHistory } from "../services/history.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function App() {
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return navigate("/signin");
    } else {
      const history = async () => {
        const historyList = await getHistory();
        console.log(historyList);
        setHistory(historyList.data.history);
      };
      history();
    } // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Header tab="Back ->" url="/" />
      <div>
        <p className="font-bold text-xl my-4 mx-2">History:</p>
        <table className="border-2 border-green-500 w-full">
          <thead>
            <tr>
              <th className="border-b border-b-black">Product Id</th>
              <th className="border-b border-b-black">User</th>
              <th className="border-b border-b-black">Email of user</th>
              <th className="border-b border-b-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">{val.productId}</td>
                  <td className="text-center">{val.userId}</td>
                  <td className="text-center">{val.user.email}</td>
                  <td className="text-center">{val.action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
