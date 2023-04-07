import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import CartProvider from "./store/CartProvider";
import Contact from "./pages/Contact";
import ProductPage from "./components/products/ProductPage";
import Login from "./pages/Login";
function App() {
  // const [item, setItem] = useState({});
  // function getData(data) {
  //   setItem(data);
  //   console.log(item);
  // }
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<Store />} />
            <Route path="contact" element={<Contact />} />
            <Route path="store/:product" element={<ProductPage />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
