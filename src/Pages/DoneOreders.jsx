import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function DoneOrders() {
  const customers = useSelector((state) => state.form.doneOrders);
//   const customers = useSelector((state) => state.form.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
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

                   
                  </div>
                ))
              )}
            </ScrollArea>

            <p className="text-lg font-semibold text-black mt-4">
              Total Price: ₹{selectedCustomer.items.reduce((total, item) => total + item.price, 0)}
            </p>

           

            

            <div className="flex justify-end mt-4">
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        </Modal>
      )}

      
    </div>
  );
}
