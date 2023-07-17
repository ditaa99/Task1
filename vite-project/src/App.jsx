import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import InvoiceCalculator from "./pages/InvoiceCalculator";
import FormPage from "./pages/FormPage";

const App = () => {
  const [products, setProducts] = useState([
    { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 },
  ]);
  const [invoices, setInvoices] = useState([]);

  return (
    <div>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route
          path="/home"
          element={<HomePage products={products} setProducts={setProducts} />}
        />
        <Route
          path="/invoices"
          element={
            <InvoiceCalculator products={products} setInvoices={setInvoices} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
