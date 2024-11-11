import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function TotalItemsPage() {
  const customers = useSelector((state) => state.form.customers);

  // Initialize counters for each food type and its subtypes
  const foodCount = {
    BBQ: {
      Pahadi: 0,
      Tandoori: 0,
      Italian: 0,
    },
    Maggie: {
      Plain: 0,
      Veg: 0,
      Italian: 0,
    },
    "Garlic Bread": {
      Cheese: 0,
      Sweetcorn: 0,
      "Onion & Capsicum": 0,
    },
  };

  // Calculate the total quantity of each food type and subtype
  customers.forEach((customer) => {
    customer.items.forEach((item) => {
      if (item.food in foodCount) {
        if (item.food === "BBQ") {
          foodCount.BBQ[item.type] += item.quantity; // Add quantity for BBQ subtypes
        } else if (item.food === "Maggie") {
          foodCount.Maggie[item.type] += item.quantity; // Add quantity for Maggie subtypes
        } else if (item.food === "Garlic Bread") {
          foodCount["Garlic Bread"][item.type] += item.quantity; // Add quantity for Garlic Bread subtypes
        }
      }
    });
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Total Items to Prepare</h2>

      {/* Display the total count for each food type */}
      <div className="space-y-4">
        {/* BBQ */}
        <div>
          <h3 className="font-semibold">BBQ</h3>
          <div className="space-y-2">
            {Object.keys(foodCount.BBQ).map((type) => (
              <div key={type} className="flex justify-between items-center">
                <p>{type}</p>
                <p className="font-semibold">{foodCount.BBQ[type]} items</p>
              </div>
            ))}
          </div>
        </div>

        {/* Maggie */}
        <div>
          <h3 className="font-semibold">Maggie</h3>
          <div className="space-y-2">
            {Object.keys(foodCount.Maggie).map((type) => (
              <div key={type} className="flex justify-between items-center">
                <p>{type}</p>
                <p className="font-semibold">{foodCount.Maggie[type]} items</p>
              </div>
            ))}
          </div>
        </div>

        {/* Garlic Bread */}
        <div>
          <h3 className="font-semibold">Garlic Bread</h3>
          <div className="space-y-2">
            {Object.keys(foodCount["Garlic Bread"]).map((type) => (
              <div key={type} className="flex justify-between items-center">
                <p>{type}</p>
                <p className="font-semibold">{foodCount["Garlic Bread"][type]} items</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}
