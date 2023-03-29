import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import CartProvider from "./store/CartProvider";
import Contact from "./pages/Contact";
import ProductPage from "./components/products/ProductPage";
import { useState } from "react";
function App() {
  const [item, setItem] = useState({});
  function getData(data) {
    setItem(data);
    console.log(item);
  }
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<Store getData={getData} />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="productPage"
              element={<ProductPage product={item} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
