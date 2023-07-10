import { useEffect } from "react";

const CalculateInvoice = (props) => {
  const { products, setInvoices } = props;

  let subTotal = 0;
  let vat = 0;
  let total = 0;

  const updatedInvoices = [];
  const groupedProducts = [];

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

    const existingGroup = groupedProducts.find(
      (group) => group.descriptions[0] === description
    );

    if (existingGroup) {
      existingGroup.descriptions.push(description);
    } else {
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

  for (let i = 0; i < groupedProducts.length; i++) {
    const {
      descriptions,
      quantity,
      price,
      discountAmount,
      vatAmount,
      totalPrice,
    } = groupedProducts[i];

    if (quantity > 50 || price > 500) {
      const invoices = [];
      let currentQuantity = quantity;
      let currentTotal = totalPrice;

      while (currentQuantity > 0) {
        const invoiceQuantity = Math.min(currentQuantity, 50);
        const invoiceTotal =
          price * invoiceQuantity + (vatAmount * invoiceQuantity) / quantity;

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
        total += invoiceTotal;
      }

      updatedInvoices.push(...invoices);
    } else {
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

  useEffect(() => {
    setInvoices(updatedInvoices);
  }, [setInvoices, updatedInvoices]);

  return <h3>Total: {total}</h3>;

  /*return (
    <div>
      <h2>Calculated Invoices</h2>
      {invoices.map((invoice, index) => (
        <div key={index}>
          <p>Description: {invoice.description}</p>
          <p>Quantity: {invoice.quantity}</p>
          <p>Price: {invoice.price}</p>
          <p>Discount: {invoice.discount}</p>
          <p>VAT: {invoice.vat}</p>
          <p>Total: {invoice.total}</p>
          <hr />
        </div>
      ))}
      <h3>Total: {total}</h3>
    </div>
  ); */
};

export default CalculateInvoice;
