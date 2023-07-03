import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  // State for storing the list of products
  const [products, setProducts] = useState([
    { description: "", quantity: 0, price: 0, discount: 0, vat: 0 },
  ]);

  // State for storing the list of invoices
  const [invoices, setInvoices] = useState([]);

  // Function to handle changes in individual field values of a product
  const handleFieldChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  // Function to handle changes in the quantity of a product
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(value, 10);
    setProducts(updatedProducts);
  };

  // Function to add a new product
  const handleAddProduct = () => {
    setProducts([...products, { description: "", quantity: 0, price: 0, discount: 0, vat: 0 }]);
  };

  // Function to calculate the invoices
const calculateInvoice = () => {
  let subTotal = 0;
  let vat = 0;
  let total = 0;

  const updatedInvoices = [];
  const groupedProducts = [];

  // Loop through each product to calculate the invoice details and group them by total price and quantity
  for (let i = 0; i < products.length; i++) {
    const { quantity, price, discount, vat: vatPercentage } = products[i];
    const subTotal = price * quantity; //price without taxes
    const discountAmount = discount * quantity;
    const vatAmount = ((subTotal - discountAmount) * vatPercentage) / 100;
    const totalPrice = subTotal + vatAmount; //final price -> with taxes

    vat += vatAmount;

    // Check if there is an existing group with the same total price and quantity
    const existingGroup = groupedProducts.find(
      (group) =>
        group.totalPrice === totalPrice &&
        group.quantity === quantity &&
        group.price === price &&
        group.discount === discount &&
        group.vatPercentage === vatPercentage
    );

    // If there is an existing group, add the product description to it
    if (existingGroup) {
      existingGroup.descriptions.push(products[i].description);
    } else {
      // If there is no existing group, create a new one with the product details
      groupedProducts.push({
        descriptions: [products[i].description],
        quantity,
        price,
        discount,
        vatPercentage,
        totalPrice,
        discountAmount,
        vatAmount,
      });
    }
  }

  // Loop through each grouped product to generate the invoices
  for (let i = 0; i < groupedProducts.length; i++) {
    const {
      descriptions,
      quantity,
      price,
      discountAmount,
      vatAmount,
      totalPrice,
    } = groupedProducts[i];

    // If the quantity is greater than 50 or price is greater than 500, generate multiple invoices
    if (quantity > 50) {
      const numInvoices = Math.ceil(quantity / 50);
      const remainingQuantity = quantity % 50;

      // Generate invoices for each batch of 50 or remaining quantity
      for (let j = 1; j <= numInvoices; j++) {
        const invoiceQuantity = j === numInvoices ? remainingQuantity : 50;
        const invoiceTotal = price * invoiceQuantity;

        updatedInvoices.push({
          description: descriptions.join(", "),
          quantity: invoiceQuantity,
          price,
          discount: discountAmount / quantity,
          vat: vatAmount / quantity,
          total: invoiceTotal,
        });
      }
    } else {
      if (price > 500) {
        updatedInvoices.push({
          description: descriptions.join(", "),
          quantity,
          price,
          discount: discountAmount / quantity,
          vat: vatAmount / quantity,
          total: totalPrice,
        });
      } else{
      // Generate invoice for the quantity less than or equal to 50 and price less than or equal to 500
      updatedInvoices.push({
        description: descriptions.join(", "),
        quantity,
        price,
        discount: discountAmount / quantity,
        vat: vatAmount / quantity,
        total: totalPrice,
      });
    }
    }
  }

  total = subTotal + vat;

  setInvoices(updatedInvoices);

  return total; // Use the total variable to return the final invoice amount
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
            <th>VAT</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  step="0.01"
                  onChange={(e) => handleFieldChange(index, "price", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) => handleFieldChange(index, "discount", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.vat}
                  step="0.01"
                  onChange={(e) => handleFieldChange(index, "vat", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddProduct}>Add Product</button>

      <button onClick={calculateInvoice}>Calculate Invoice</button>

      <h2>Invoices</h2>
      <div id="invoice-list">
        {invoices.map((invoice, index) => (
          <div key={index}>
            <h3>Invoice {index + 1}</h3>
            <p>Description: {invoice.description}</p>
            <p>Quantity: {invoice.quantity}</p>
            <p>Price: {invoice.price}</p>
            <p>Discount: {invoice.discount}</p>
            <p>VAT: {invoice.vat}</p>
            <p>Total: {invoice.total}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
