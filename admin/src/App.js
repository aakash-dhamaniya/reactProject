import "./App.css";
import { useEffect, useRef, useState } from "react";
import ShowItems from "./components/ShowItems";
const getDetaFormLs = () => {
  const data = localStorage.getItem("product");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
function getTotalPrice() {
  let totalPrice = 0;
  const data = JSON.parse(localStorage.getItem("product"));
  if (data) {
    for (let price of Object.values(data)) {
      totalPrice = +totalPrice + +price.sellingPhone;
    }
    console.log(totalPrice);
    return totalPrice;
  } else return "";
}

function App() {
  const [data, setData] = useState(getDetaFormLs());
  const [totalPrice, setTotalPrice] = useState(getTotalPrice());
  const productId = useRef("");
  const sellingPhone = useRef("");
  const phoneName = useRef("");
  function submitHandler(e) {
    e.preventDefault();
    console.log("click");
    const item = {
      productId: productId.current.value,
      sellingPhone: sellingPhone.current.value,
      phoneName: phoneName.current.value,
    };
    let totalprice = +totalPrice + +sellingPhone.current.value;
    setData([...data, item]);
    setTotalPrice(totalprice);
  }
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label htmlFor="">Product id:</label>
        <input type="text" ref={productId} />
        <label htmlFor="">Selling phone</label>
        <input type="text" ref={sellingPhone} />
        <label htmlFor="">Phone Name</label>
        <input type="text" ref={phoneName} />
        <button>Add Product</button>
      </form>
      <h1>Products</h1>
      <ShowItems items={data} />
      <h3>total Value Worth of Products</h3>
      {totalPrice}
    </div>
  );
}

export default App;
