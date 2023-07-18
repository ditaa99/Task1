import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import { app } from './components/auth/firebaseConfig';
import HomePage from "./pages/HomePage";
import InvoiceCalculator from "./pages/InvoiceCalculator";
import FormPage from "./pages/FormPage";

const App = () => {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([
    { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 },
  ]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<FormPage setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn prop
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomePage
                products={products}
                setProducts={setProducts}
                isLoggedIn={isLoggedIn} // Pass isLoggedIn prop
                setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn prop
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/invoices"
          // element={<InvoiceCalculator products={products} setInvoices={setInvoices} />}
          element={
            isLoggedIn ? (
              <InvoiceCalculator
                products={products}
                setInvoices={setInvoices}
                setProducts={setProducts}
                isLoggedIn={isLoggedIn} // Pass isLoggedIn prop
                setIsLoggedIn={setIsLoggedIn} // Pass setIsLoggedIn prop
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
