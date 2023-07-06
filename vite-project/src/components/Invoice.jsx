import React from 'react';

const Invoice = ({ index, invoice }) => {
  return (
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
  );
};

export default Invoice;
