import { useState } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import AddMedicne from "./components/medicines/AddMedicne";
import MediProvider from "./store/MediProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);
  const showCartHandler = () => {
    setCartShown(true);
  };
  const hideCartHandler = () => {
    setCartShown(false);
  };
  return (
    <MediProvider>
      {cartShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <AddMedicne />
      </main>
    </MediProvider>
  );
}

export default App;
