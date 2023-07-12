import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Buttons from "../components/Buttons";

const HomePage = ({ products, setProducts }) => {
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
    <div className={products.length === 0 ? "homepage pempty" : "homepage"}>
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

    </div>
  );
};

export default HomePage;
