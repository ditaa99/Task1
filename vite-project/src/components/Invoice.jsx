import React from "react";

const Invoice = (props) => {
  const { index, invoice } = props;
  console.log({ props });
  return (
    <div key={index}>
      <h2>Invoice {index + 1}</h2>
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
      <h3>Invoice total: {invoice.totalPrice.reduce((a, b) => a + b)}</h3>
      <hr />
    </div>

  );
};

export default Invoice;
