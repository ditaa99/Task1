import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Invoice from "./components/Invoice";
import Input from "./components/Input";
import Buttons from "./components/Buttons";
import CalculateInvoice from "./components/calculateInvoice";

const App = () => {
  const [products, setProducts] = useState([
    { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 },
  ]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const handleFieldChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 },
    ]);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Invoice Calculator</h1>

      <h2>Product List</h2>
      <table id="product-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>VAT (%)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <Input
                  type="text"
                  value={product.description}
                  onChange={(e) =>
                    handleFieldChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  value={product.quantity}
                  onChange={(e) =>
                    handleFieldChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  value={product.price}
                  step="0.01"
                  onChange={(e) =>
                    handleFieldChange(index, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  value={product.discount}
                  onChange={(e) =>
                    handleFieldChange(index, "discount", e.target.value)
                  }
                />
              </td>
              <td>
                <Input
                  value={product.vat}
                  step="0.01"
                  onChange={(e) =>
                    handleFieldChange(index, "vat", e.target.value)
                  }
                />
              </td>
              <td>
                <Buttons
                  className="del"
                  onClick={() => handleDeleteProduct(index)}
                  text="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Buttons onClick={handleAddProduct} text="Add Product" />
      <Buttons onClick={() => navigate("/invoices")} text="Calculate Invoice" />

      <h2>Invoices</h2>
      <div id="invoice-list">
        {invoices.map((invoice, index) => (
          <Invoice key={index} invoice={invoice} index={index} />
        ))}
      </div>

      <Routes>
        <Route
          path="/invoices"
          element={
            <CalculateInvoice products={products} setInvoices={setInvoices} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
