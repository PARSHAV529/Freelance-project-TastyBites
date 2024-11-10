import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerName } from "./formSlice";
import Modal from "./Modal";
import { InputForm } from "./InputForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CardWithForm() {
  const dispatch = useDispatch();
  const [customerName, setName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddCustomer = () => {
    dispatch(setCustomerName(customerName));
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter Customer Name"
        value={customerName}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleAddCustomer}>Add Item</Button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <InputForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
