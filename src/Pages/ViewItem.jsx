import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  deleteItem,
  addItemToCustomer,
  markItemDone,
  completeOrder,
} from "@/store/formSlice";
import { InputForm } from "./Form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ViewItems() {
  const customers = useSelector((state) => state.form.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setIsAddItemOpen(false);
    setIsModalOpen(false);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem({ customerName: selectedCustomer.customerName, index }));
  };

  const handleAddNewItem = (item) => {
    dispatch(addItemToCustomer({ customerName: selectedCustomer.customerName, item }));
    setIsAddItemOpen(false);
  };

  const handleMarkItemDone = (index) => {
    dispatch(markItemDone({ customerName: selectedCustomer.customerName, index }));
    setIsModalOpen(false);
  };

  const handleCompleteOrder = () => {
    // Update all items' status to 'Done'
    const updatedItems = selectedCustomer.items.map((item) => ({
      ...item,
      isDone: true, // Mark all items as done
    }));
    
    // Dispatch an action to update the items for the selected customer
    dispatch(completeOrder({ customerName: selectedCustomer.customerName, updatedItems }));
    
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Customer Orders</h2>
      {customers.length === 0 && <p className="text-center">No customers added yet.</p>}

      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2 gap-6">
            <p className="flex-1 truncate">{customer.customerName}</p>
            <Button onClick={() => handleOpenModal(customer)}>View Order</Button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCustomer && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4 space-y-6">
            <h3 className="text-2xl font-semibold text-center text-black">
              Order Details for {selectedCustomer.customerName}
            </h3>

            <ScrollArea className="h-72 rounded-md border bg-gray-100 p-4">
              {selectedCustomer.items.length === 0 ? (
                <p className="text-center text-gray-600">No items in this order.</p>
              ) : (
                selectedCustomer.items.map((item, index) => (
                  <div
                    key={index}
                    className={`border p-2 mt-2 rounded bg-white text-black ${item.isDone ? "!bg-green-200" : ""}`}
                  >
                    <p><strong>Food:</strong> {item.type} {item.food}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    {item.food !== "Garlic Bread" && <p><strong>Cheese:</strong> {item.cheese}</p>}
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <p><strong>Status:</strong> {item.isDone ? "Done" : "Pending"}</p>

                    <div className="flex space-x-4 mt-2">
                      <Button onClick={() => handleMarkItemDone(index)}>
                        {item.isDone ? "Undo" : "Mark as Done"}
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteItem(index)}>
                        Delete Item
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>

            <p className="text-lg font-semibold text-black mt-4">
              Total Price: ₹{selectedCustomer.items.reduce((total, item) => total + item.price, 0)}
            </p>

            {/* Add New Item Button */}
            <div className="text-center">
              <Button onClick={() => setIsAddItemOpen(true)} className="mt-4">
                Add New Item
              </Button>
            </div>

            {/* Complete Order Button */}
            <div className="text-center mt-4">
              <Button onClick={handleCompleteOrder} className="bg-blue-600 text-white">
                Complete Order
              </Button>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      {isAddItemOpen && (
        <Modal isOpen={isAddItemOpen} onClose={handleCloseModal}>
          <InputForm onAddItem={handleAddNewItem} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
