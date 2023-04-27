import React, { useContext, useEffect, useRef, useState } from "react";
import ShowMedicine from "./ShowMedicine";
//getting the values of local storage becasue when the component reredner it will overwride with emepty array
const getDetaFormLs = () => {
  const data = localStorage.getItem("medicine");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const MedicineForm = () => {
  const [medicines, setMedicines] = useState(getDetaFormLs());
  const [medicine, setMedicine] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, Setquantity] = useState("");
  const addItemHandler = (e) => {
    e.preventDefault();
    //preventing dublicates items to push
    let updatedItems;
    let quan = +quantity;
    const existingMedItemIndex = medicines.findIndex(
      (item) => item.id === medicine
    );
    const existingMed = medicines[existingMedItemIndex];
    if (existingMedItemIndex !== -1) {
      const updateitem = {
        ...existingMed,
        quantity: +existingMed.quantity + quan,
      };
      updatedItems = [...medicines];
      updatedItems[existingMedItemIndex] = updateitem;
      setMedicines(updatedItems);
    } else {
      let med = {
        id: medicine,
        medicine,
        description,
        price,
        quantity,
      };
      setMedicines([...medicines, med]);
    }
  };
  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("medicine", JSON.stringify(medicines));
  }, [medicines]);
  return (
    <>
      <form className="form" onSubmit={addItemHandler}>
        <label htmlFor="">Candy Name:</label>
        <input
          name="Candy"
          type="text"
          required
          onChange={(e) => setMedicine(e.target.value)}
          value={medicine}
        />
        <label>Description:</label>
        <input
          name="description"
          type="text"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <label htmlFor="">Price:</label>
        <input
          name="price"
          type="text"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <label>Quantity</label>
        <input
          type="number"
          className="number"
          min={1}
          required
          onChange={(e) => Setquantity(e.target.value)}
          value={quantity}
        />
        <button>Add</button>
      </form>
      <ShowMedicine medicines={medicines} />
    </>
  );
};

export default MedicineForm;
