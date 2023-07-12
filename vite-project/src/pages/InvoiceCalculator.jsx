import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Invoice from "../components/Invoice";
import Buttons from "../components/Buttons";

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
          // currentInvoice.totalPrice.reduce((a, b) => a + b, 0) + totalPrice > 500 ||
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
        // const addToInvoice = Math.min(
        //   remainingQuantity,
        //   currentInvoice.quantity.reduce((a, b) => a + b, 0) >= 50
        //     ? 0
        //     : 50 - currentInvoice.quantity.reduce((a, b) => a + b, 0),
        //   totalPrice > 500 ? remainingQuantity : Infinity
        // ); 

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
  const navigate = useNavigate();

  /*the useEffect hook is used to update the invoices state variable whenever it changes. It has two dependencies specified: 
  setInvoices and invoices. Whenever either of these dependencies changes, the effect will be triggered.*/
  useEffect(() => {
    const initialInvoices = calculateInvoices(products);
    setInvoices(initialInvoices.invoices);
  }, []);

  return (
    <div className="invoicestyle">
      <h1>Calculated Invoices</h1>
      {invoices.map((invoice, index) => (
        <Invoice index={index} invoice={invoice} />
      ))}
      <h3>Total: {total}</h3>
      <Buttons onClick={() => navigate("/")} text="Go Back" />
    </div>
  );
};

export default InvoiceCalculator;
