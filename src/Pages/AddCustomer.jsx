import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "@/store/formSlice";
import Modal from "@/components/Modal";
import { InputForm } from "./Form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddCustomer() {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle adding an item to the list
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Function to handle the final submission
  const handleSubmit = () => {
    if (customerName && items.length > 0) {
      dispatch(addCustomer({ customerName, items }));
      alert("Customer and items added successfully!");
      // Reset state
      setCustomerName("");
      setItems([]);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Input
        placeholder="Enter Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <Button onClick={() => setModalOpen(true)}>Add Item</Button>

      {/* Modal for adding items */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <InputForm onAddItem={handleAddItem} onClose={() => setModalOpen(false)} />
      </Modal>

      <Button onClick={handleSubmit} disabled={!customerName || items.length === 0}>
        Submit
      </Button>

      {/* Show list of items added */}
      {items.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3>Items for {customerName}:</h3>
          {items.map((item, index) => (
            <div key={index} className="border p-2">
              <p><strong>Food:</strong> {item.food}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.food !== "Garlic Bread" && (
                <p><strong>Cheese:</strong> {item.cheese}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
