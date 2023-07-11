import React, { useEffect } from "react";

const InvoiceCalculator = ({ products, setInvoices }) => {
  const calculateInvoices = (products) => {
    let subTotal = 0;
    let vat = 0;
    let total = 0;

    const invoices = [];
    let currentInvoice = null;

    for (let i = 0; i < products.length; i++) {
      const {
        description,
        quantity,
        price,
        discount,
        vat: vatPercentage,
      } = products[i];
      const productSubTotal = price * quantity;
      const discountAmount = discount * quantity;
      const vatAmount =
        ((productSubTotal - discountAmount) * vatPercentage) / 100;
      const totalPrice = productSubTotal + vatAmount;

      subTotal += productSubTotal;
      vat += vatAmount;

      let remainingQuantity = quantity;

      while (remainingQuantity > 0) {
        if (
          !currentInvoice ||
          currentInvoice.quantity.reduce((a, b) => a + b, 0) >= 50 ||
          currentInvoice.totalPrice.reduce((a, b) => a + b, 0) > 500 ||
          totalPrice > 500
        ) {
          // Create a new invoice if the current one is full or the price exceeds the limit
          currentInvoice = {
            descriptions: [],
            quantity: [],
            price: [],
            discountAmount: [],
            vatAmount: [],
            totalPrice: [],
          };
          invoices.push(currentInvoice);
        }

        const addToInvoice = Math.min(
          remainingQuantity,
          totalPrice > 500
            ? remainingQuantity
            : 50 - currentInvoice.quantity.reduce((a, b) => a + b, 0)
        );

        currentInvoice.descriptions.push(description);
        currentInvoice.quantity.push(addToInvoice);
        currentInvoice.price.push(price);
        currentInvoice.discountAmount.push(
          (discountAmount / quantity) * addToInvoice
        );
        currentInvoice.vatAmount.push((vatAmount / quantity) * addToInvoice);
        currentInvoice.totalPrice.push((totalPrice / quantity) * addToInvoice);

        remainingQuantity -= addToInvoice;
      }
    }

    invoices.forEach((invoice) => {
      total += invoice.totalPrice.reduce((a, b) => a + b, 0);
    });

    return {
      invoices,
      subTotal,
      vat,
      total,
    };
  };

  const { invoices, total } = calculateInvoices(products);

  /*the useEffect hook is used to update the invoices state variable whenever it changes. It has two dependencies specified: 
  setInvoices and invoices. Whenever either of these dependencies changes, the effect will be triggered.*/
  useEffect(() => {
    setInvoices(invoices);
  }, [setInvoices, invoices]);

  return (
    <div>
      <h2>Calculated Invoices</h2>
      {invoices.map((invoice, index) => (
        <div key={index}>
          <h3>Invoice {index + 1}</h3>
          {invoice.descriptions.map((description, i) => (
            <div key={i}>
              <p>Description: {description}</p>
              <p>Quantity: {invoice.quantity[i]}</p>
              <p>Price: {invoice.price[i]}</p>
              <p>Discount: {invoice.discountAmount[i]}</p>
              <p>VAT: {invoice.vatAmount[i]}</p>
              <p>Total: {invoice.totalPrice[i]}</p>
              <hr />
            </div>
          ))}
          <h4>Invoice total: {invoice.totalPrice.reduce((a, b) => a + b)}</h4>
          <hr />
        </div>
      ))}
      <h3>Total: {total}</h3>
    </div>
  );
};

export default InvoiceCalculator;
