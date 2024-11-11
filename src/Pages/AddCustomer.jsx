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
    setIsModalOpen(false); // Close modal after adding an item
  };

  // Function to handle final submission
  const handleSubmit = () => {
    if (!customerName) {
      alert("Please enter a customer name.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    dispatch(addCustomer({ customerName, items }));
    setCustomerName("");
    setItems([]);
  };

  return (
    
    <div className="max-w-2xl mx-auto p-6 bg-transparent rounded-xl shadow-md space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800">Add Customer</h2>

      {/* Customer Name Input */}
      <Input
        type="text"
        placeholder="Enter Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full border rounded-lg"
      />

      {/* Button to Open Modal */}
      <Button onClick={() => setIsModalOpen(true)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
        Add Item
      </Button>

      {/* Display List of Added Items */}
      {items.length > 0 && (
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="font-semibold text-lg">
                {item.type} {item.food}
              </p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.food !== "Garlic Bread" && <p><strong>Cheese:</strong> {item.cheese}</p>}
              <p><strong>Price:</strong> ₹{item.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-6">
        Submit Order
      </Button>

      {/* Modal for Adding Items */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InputForm onAddItem={handleAddItem} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
    
  );
}
