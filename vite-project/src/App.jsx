import { useState } from 'react'
import Invoice from './components/Invoice'
import './App.css'

const App = () => {
  // State for storing the list of products
  const [products, setProducts] = useState([
    { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 },
  ]);

  // State for storing the list of invoices
  const [invoices, setInvoices] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);


  // Function to handle changes in individual field values of a product
  const handleFieldChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  // Function to add a new product
  const handleAddProduct = () => {
    setProducts([...products, { description: "", quantity: 0, price: 0.0, discount: 0.0, vat: 0 }]);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
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
      const { description, quantity, price, discount, vat: vatPercentage } = products[i];
      const productSubTotal = price * quantity; // price without taxes
      const discountAmount = discount * quantity;
      const vatAmount = ((productSubTotal - discountAmount) * vatPercentage) / 100;
      const totalPrice = productSubTotal + vatAmount; // final price -> with taxes
  
      subTotal += productSubTotal;
      vat += vatAmount;
  
      // Check if there is an existing group with the same description
      const existingGroup = groupedProducts.find(
        (group) => group.descriptions[0] === description
      );
      
  
      // If there is an existing group, add the product description to it
      if (existingGroup) {
        existingGroup.descriptions.push(description);
      } else {
        // If there is no existing group, create a new one with the product details
        groupedProducts.push({
          descriptions: [description],
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
  
    setSubTotal(subTotal);
    setVat(vat);
    setTotal(total);
  
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
  
      // Create a new invoice for each product if the quantity is greater than 50 or price is greater than 500
      if (quantity > 50 || price > 500) {
        const invoices = [];
        let currentQuantity = quantity;
        let currentTotal = totalPrice;
  
        while (currentQuantity > 0) {
          const invoiceQuantity = Math.min(currentQuantity, 50);
          const invoiceTotal = price * invoiceQuantity + vatAmount * invoiceQuantity / quantity;
  
          invoices.push({
            description: descriptions.join(", "),
            quantity: invoiceQuantity,
            price,
            discount: discountAmount / quantity,
            vat: vatAmount / quantity,
            total: invoiceTotal,
          });
  
          currentQuantity -= invoiceQuantity;
          currentTotal -= invoiceTotal;
          total += invoiceTotal; // Update total with correct VAT amount for each invoice generated
        }
  
        updatedInvoices.push(...invoices);
      } else {
        // Add the product to the existing invoice if the quantity is less than or equal to 50 and price less than or equal to 500
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
          <th>VAT (%)</th>
        </tr>
      </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
               + <input
                  type="text"
                  value={product.description}
                  onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleFieldChange(index, "quantity", e.target.value)}
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

              <td>
                <button className="del" onClick={() => handleDeleteProduct(index)}>Delete</button>
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
        <Invoice key={index} invoice={invoice} index={index} />
      ))}

      </div>

    </div>
  );
};

export default App;

// krejt cka jon reusable mi bo components: inputat, butonat