import { useSelector } from "react-redux";

export default function TotalItemsPage() {
  const customers = useSelector((state) => state.form.customers);

  // Initialize counters for each food type and its subtypes (total and pending)
  const foodCount = {
    BBQ: {
      Pahadi: { total: 0, pending: 0 },
      Tandoori: { total: 0, pending: 0 },
      Italian: { total: 0, pending: 0 },
    },
    Maggie: {
      Plain: { total: 0, pending: 0 },
      Veg: { total: 0, pending: 0 },
      Italian: { total: 0, pending: 0 },
    },
    "Garlic Bread": {
      Cheese: { total: 0, pending: 0 },
      Sweetcorn: { total: 0, pending: 0 },
      "Onion & Capsicum": { total: 0, pending: 0 },
    },
  };

  // Calculate the total and pending quantity of each food type and subtype
  customers.forEach((customer) => {
    customer.items.forEach((item) => {
      if (item.food in foodCount) {
        if (item.food === "BBQ") {
          foodCount.BBQ[item.type].total += item.quantity;
          if (!item.isDone) foodCount.BBQ[item.type].pending += item.quantity;
        } else if (item.food === "Maggie") {
          foodCount.Maggie[item.type].total += item.quantity;
          if (!item.isDone) foodCount.Maggie[item.type].pending += item.quantity;
        } else if (item.food === "Garlic Bread") {
          foodCount["Garlic Bread"][item.type].total += item.quantity;
          if (!item.isDone) foodCount["Garlic Bread"][item.type].pending += item.quantity;
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
                <div className="space-x-2">
                  {/* <span className="font-semibold">Total: {foodCount.BBQ[type].total} items</span>
                  <span className="text-red-500">Pending: {foodCount.BBQ[type].pending} items</span> */}
                  <span className="font-semibold">Pending: {foodCount.BBQ[type].pending} items</span>
                </div>
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
                <div className="space-x-2">
                  <span className="font-semibold">Pending: {foodCount.Maggie[type].pending} items</span>
                  {/* <span className="text-red-500">Pending: {foodCount.Maggie[type].pending} items</span> */}
                </div>
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
                <div className="space-x-2">
                  {/* <span className="font-semibold">Total: {foodCount["Garlic Bread"][type].total} items</span>
                  <span className="text-red-500">Pending: {foodCount["Garlic Bread"][type].pending} items</span> */}
                <span className="font-semibold">Pending: {foodCount["Garlic Bread"][type].pending} items</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
