import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import ProductPage from "./components/products/ProductPage";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
import CartContext from "./store/cart-context";
import Layout from "./components/layout/Layout";
import SignUp from "./pages/SignUp";
import { baseAddress } from "./utils/api";

function App() {
  const cartCtx = useContext(CartContext);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  //fetching all data from backend
  useEffect(() => {
    console.log("get data");
    getCartItems();
  }, [cartCtx.isLoggedIn]);

  //for adding data
  useEffect(() => {
    if (!isFirstLoad) {
      setIsFirstLoad(true);
      return;
    }
    addItem();
  }, [cartCtx.items]);
  async function addItem() {
    const data = cartCtx.items;
    const res = await fetch(
      `${baseAddress}/${localStorage.getItem("endpoint")}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  }
  async function getCartItems() {
    const res = await fetch(
      `${baseAddress}/${localStorage.getItem("endpoint")}.json`
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      if (data) cartCtx.getCartData(data);
    }
  }
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<Home />} />
    //     <Route path="about" element={<About />} />
    //     {cartCtx.isLoggedIn ? (
    //       <Route path="store" element={<Store />} />
    //     ) : (
    //       <Route path="login" element={<Login />} />
    //     )}
    //     <Route path="contact" element={<Contact />} />
    //     <Route path="store/:product" element={<ProductPage />} />
    //     <Route path="login" element={<Login />} />
    //   </Route>
    // </Routes>
    <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/store" exact>
            {cartCtx.isLoggedIn ? <Store /> : <Redirect to="login" />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            {!cartCtx.isLoggedIn ? <Login /> : <Redirect to="store/" />}
          </Route>
          <Route path="/store/:productId">
            <ProductPage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
