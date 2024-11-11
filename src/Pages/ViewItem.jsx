import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { deleteItem, addItemToCustomer } from "@/store/formSlice"; // Import actions
import { InputForm } from "./Form"; // Assuming InputForm is used for adding new items

export default function ViewItems() {
  const customers = useSelector((state) => state.form.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false); // State to control Add Item form visibility
  const dispatch = useDispatch();

  // Open modal with selected customer details
  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
    setIsAddItemOpen(false); // Reset add item form visibility
  };

  // Handle deleting an item from the customer's order
  const handleDeleteItem = (index) => {
    dispatch(deleteItem({ customerName: selectedCustomer.customerName, index }));
    setIsModalOpen(false);

  };

  // Handle adding a new item to the customer's order
  const handleAddNewItem = (item) => {
    dispatch(addItemToCustomer({ customerName: selectedCustomer.customerName, item }));
     setIsAddItemOpen(false); // Close the add item form after submission

  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Customer List</h2>
      {customers.length === 0 && <p>No customers added yet.</p>}

      {/* List of customers */}
      {customers.map((customer, index) => (
        <div key={index} className="flex justify-between items-center border-b py-2 gap-40">
          <p>{customer.customerName}</p>
          <Button onClick={() => handleOpenModal(customer)}>View Order</Button>
        </div>
      ))}

      {/* Modal to show customer order details */}
      {isModalOpen && selectedCustomer && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h3 className="text-xl font-semibold mb-4">
            Order Details for {selectedCustomer.customerName}
          </h3>
          {selectedCustomer.items.length === 0 ? (
            <p>No items in this order.</p>
          ) : (
            selectedCustomer.items.map((item, index) => (
              <div key={index} className="border p-2 mt-2">
                <p><strong>Food:</strong> {item.type} {item.food}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                {item.food !== "Garlic Bread" && (
                  <p><strong>Cheese:</strong> {item.cheese}</p>
                )}
                <p>Price: ₹{item.price}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(index)}
                  className="mt-2"
                >
                  Delete Item
                </Button>
              </div>
            ))
          )}
        <p><strong>Total Price:</strong> ₹{selectedCustomer.items.reduce((total, item) => total + item.price, 0)}</p>

          {/* Add New Item Button */}
          <Button onClick={() => setIsAddItemOpen(true)} className="mt-4">
            Add New Item
          </Button>

          {/* Add Item Form */}
          {isAddItemOpen && (
            <div className="mt-4">
              <InputForm onAddItem={handleAddNewItem} onClose={handleCloseModal} />
            </div>
          )}

          <div className="flex justify-end items-end">
            <Button onClick={handleCloseModal} className="mt-4">Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
