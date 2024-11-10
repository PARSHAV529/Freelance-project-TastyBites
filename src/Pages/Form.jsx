import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// eslint-disable-next-line react/prop-types
export function InputForm({ onAddItem, onClose }) {
  const form = useForm({
    defaultValues: {
      food: "",
      type: "",
      cheese: "",
    },
  });

  const { watch, setValue } = form;
  const selectedFood = watch("food");

  const typeOptions = {
    BBQ: ["Pahadi", "Tandoori", "Italian"],
    Maggie: ["Plain", "Veg", "Italian"],
    "Garlic Bread": ["Cheese", "Sweetcorn", "Onion & Capsicum"],
  };

  const onSubmit = (data) => {
    onAddItem(data);
    onClose();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {selectedFood !== "Garlic Bread" && (
        <RadioGroup onValueChange={(value) => setValue("cheese", value)}>
          <RadioGroupItem value="with Cheese">With Cheese</RadioGroupItem>
          <RadioGroupItem value="without Cheese">Without Cheese</RadioGroupItem>
        </RadioGroup>
      )}

      <Button type="submit">Add Item</Button>
    </form>
  );
}
