import { useSelector } from "react-redux";

export default function ViewItems() {
  const customers = useSelector((state) => state.form.customers);

  return (
    <div className="p-4 space-y-4">
      <h2>Customers and Items</h2>
      {customers.map((customer, index) => (
        <div key={index} className="border p-4">
          <h3>Customer: {customer.customerName}</h3>
          {customer.items.map((item, idx) => (
            <div key={idx} className="border p-2 mt-2">
              <p><strong>Food:</strong> {item.food}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.food !== "Garlic Bread" && (
                <p><strong>Cheese:</strong> {item.cheese}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
