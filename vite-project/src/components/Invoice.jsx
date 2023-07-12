import React from "react";

const Invoice = (props) => {
  const { index, invoice } = props;
  console.log({ props });
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

export default Invoice;
