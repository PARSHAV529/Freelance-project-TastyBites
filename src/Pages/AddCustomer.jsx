import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "@/store/formSlice";
import Modal from "@/components/Modal";
import { InputForm } from "./Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddCustomer() {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add an item to the customer's order
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Function to handle final submission
  const handleSubmit = () => {
    if (customerName && items.length > 0) {
      dispatch(addCustomer({ customerName, items }));
      setCustomerName("");
      setItems([]);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Add Customer</h2>
      <Input
        type="text"
        placeholder="Enter Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <Button onClick={() => setIsModalOpen(true)} className="mt-4">
        Add Item
      </Button>

      {/* Display list of items added */}
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border p-2">
            <p><strong>Food:</strong> {item.type} {item.food}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            {item.food !== "Garlic Bread" && <p><strong>Cheese:</strong> {item.cheese}</p>}
            <p><strong>Price:</strong> ₹{item.price}</p>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Submit Order
      </Button>

      {/* Modal for adding items */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InputForm onAddItem={handleAddItem} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
