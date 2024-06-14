import Header from "./components/Header";
import ProductsList from "./components/ProductsList";

function App() {
  const token = localStorage.getItem("authToken");
  return (
    <div className="flex flex-col w-full">
      <Header tab={"History"} url={token ? "/history" : "/signin"} />
      <ProductsList />
    </div>
  );
}

export default App;
