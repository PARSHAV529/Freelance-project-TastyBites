// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import NotFound from "../Pages/NotFound";
import ViewItem from "@/Pages/ViewItem";
import AddCustomer from "@/Pages/AddCustomer";
import TotalItemsPage from "@/Pages/TotalItemsPage";

const Routeing = () => {
  return (
    <>

      <Router>
      <div className="flex justify-center space-x-6 mb-8">
        <Link to="/add">Add Item</Link>
        <Link to="/view">View Items</Link>
        <Link to="/total-items">total-items</Link>
      </div>
        <Routes>
          <Route path="/view" element={<ViewItem/>} />
          <Route path="/add" element={<AddCustomer/>} />
          <Route path="/total-items" element={<TotalItemsPage/>} />
          <Route path="*" element={ <NotFound/>} />

        </Routes>
      </Router>
    </>
  );
};

export default Routeing;
