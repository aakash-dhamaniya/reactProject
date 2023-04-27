import React, { useContext } from "react";
import MediContext from "../../store/medicine-context";

function MedicineItems(props) {
  const ctx = useContext(MediContext);
  function addItem(quantity) {
    ctx.addItem({
      candyName: props.name,
      description: props.description,
      price: props.price,
      quantity: quantity,
    });
  }
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <button
        onClick={() => {
          addItem(1);
        }}
      >
        Buy one
      </button>
      <button
        onClick={() => {
          addItem(2);
        }}
      >
        Buy two
      </button>
      <button
        onClick={() => {
          addItem(3);
        }}
      >
        Buy three
      </button>
    </tr>
  );
}

export default MedicineItems;
