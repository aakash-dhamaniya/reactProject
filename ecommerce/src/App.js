import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import ProductPage from "./components/products/ProductPage";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import CartContext from "./store/cart-context";
import Layout from "./components/layout/Layout";
function App() {
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    cartCtx.showItem();
    console.log("in app");
  }, [cartCtx.isLoggedIn]);
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
            <Login />
          </Route>
          <Route path="/store/:productId">
            <ProductPage />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
