// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotFound from "../Pages/NotFound";
import ViewItem from "@/Pages/ViewItem";
import AddCustomer from "@/Pages/AddCustomer";
import TotalItemsPage from "@/Pages/TotalItemsPage";
import Navbar from "./Navigation";
import DoneOrders from "@/Pages/DoneOreders";

const Routeing = () => {
  return (
    <>

      <Router>
      <Navbar/>
        <Routes>
          <Route path="/view" element={<ViewItem/>} />
          <Route path="/" element={<AddCustomer/>} />
          <Route path="/total-items" element={<TotalItemsPage/>} />
          <Route path="/done-oreder" element={<DoneOrders/>} />
          <Route path="*" element={ <NotFound/>} />

        </Routes>
      </Router>
    </>
  );
};

export default Routeing;
