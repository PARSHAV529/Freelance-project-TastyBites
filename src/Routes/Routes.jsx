// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import NotFound from "../Pages/NotFound";
import ViewItem from "@/Pages/ViewItem";
import AddCustomer from "@/Pages/AddCustomer";
import TotalItemsPage from "@/Pages/TotalItemsPage";
import Navbar from "./Navigation";

const Routeing = () => {
  return (
    <>

      <Router>
      <Navbar/>
        <Routes>
          <Route path="/view" element={<ViewItem/>} />
          <Route path="/" element={<AddCustomer/>} />
          <Route path="/total-items" element={<TotalItemsPage/>} />
          <Route path="*" element={ <NotFound/>} />

        </Routes>
      </Router>
    </>
  );
};

export default Routeing;
