import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function InputForm({ onAddItem, onClose, initialData }) {
  const form = useForm({
    defaultValues: initialData || {
      food: "",
      type: "",
      cheese: "",
      quantity: 1,
      price: 0,
    },
  });

  const { watch, setValue, register, handleSubmit } = form;
  const selectedFood = watch("food");
  const selectedType = watch("type");
  const selectedCheese = watch("cheese");
  const quantity = watch("quantity");

  // eslint-disable-next-line react/prop-types
  const [totalPrice, setTotalPrice] = useState(initialData?.price || 0);

  // Pricing logic
  const prices = {
    BBQ: { base: 100, types: { Pahadi: 20, Tandoori: 25, Italian: 30 }, cheese: { "with Cheese": 15, "without Cheese": 0 } },
    Maggie: { base: 50, types: { Plain: 10, Veg: 15, Italian: 20 }, cheese: { "with Cheese": 10, "without Cheese": 0 } },
    "Garlic Bread": { base: 80, types: { Cheese: 10, Sweetcorn: 15, "Onion & Capsicum": 20 }, cheese: { "with Cheese": 0, "without Cheese": 0 } },
  };

  const typeOptions = {
    BBQ: ["Pahadi", "Tandoori", "Italian"],
    Maggie: ["Plain", "Veg", "Italian"],
    "Garlic Bread": ["Cheese", "Sweetcorn", "Onion & Capsicum"],
  };

  // Calculate total price based on selected options
  useEffect(() => {
    if (selectedFood) {
      const basePrice = prices[selectedFood]?.base || 0;
      const typePrice = prices[selectedFood]?.types[selectedType] || 0;
      const cheesePrice = prices[selectedFood]?.cheese[selectedCheese] || 0;
      const calculatedPrice = (basePrice + typePrice + cheesePrice) * quantity;
      setTotalPrice(calculatedPrice);
      setValue("price", calculatedPrice);
    }
  }, [selectedFood, selectedType, selectedCheese, quantity]);

  const onSubmit = (data) => {
    onAddItem(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select onValueChange={(value) => setValue("food", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a Food" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BBQ">BBQ</SelectItem>
          <SelectItem value="Garlic Bread">Garlic Bread</SelectItem>
          <SelectItem value="Maggie">Maggie</SelectItem>
        </SelectContent>
      </Select>

      {selectedFood && (
        <Select onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions[selectedFood]?.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {selectedFood !== "Garlic Bread" && (
        <RadioGroup onValueChange={(value) => setValue("cheese", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="with Cheese" id="with-cheese" />
            <label htmlFor="with-cheese">With Cheese</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="without Cheese" id="without-cheese" />
            <label htmlFor="without-cheese">Without Cheese</label>
          </div>
        </RadioGroup>
      )}

      <Input type="number" placeholder="Enter Quantity" {...register("quantity", { valueAsNumber: true })} min={1} />
      <div className="font-semibold">Total Price: ₹{totalPrice}</div>
      <Button type="submit">Save Item</Button>
    </form>
  );
}
