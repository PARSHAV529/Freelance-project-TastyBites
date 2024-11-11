import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";

export default function ViewItems() {
  const customers = useSelector((state) => state.form.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected customer details
  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
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

          {/* Calculate total price for all items */}
          {selectedCustomer.items.map((item, index) => (
            <div key={index} className="border p-2 mt-2">
              <p><strong>Food:</strong> {item.type} {item.food}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.food !== "Garlic Bread" && <p><strong>Cheese:</strong> {item.cheese}</p>}
              <p><strong>Price:</strong> ₹{item.price}</p>
            </div>
          ))}

          {/* Display total price for all items */}
          <div className="border-t mt-4 pt-4 text-lg font-semibold">
            Total Price: ₹
            {selectedCustomer.items.reduce((acc, item) => acc + item.price, 0)}
          </div>

          {/* Close button */}
          <div className="flex justify-end mt-4">
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
