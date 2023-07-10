// Function to calculate the invoices
export const calculateInvoice = (products, setInvoices) => {
  console.log({ setInvoices });
  let subTotal = 0;
  let vat = 0;
  let total = 0;

  const updatedInvoices = [];
  const groupedProducts = [];

  // Loop through each product to calculate the invoice details and group them by total price and quantity
  for (let i = 0; i < products.length; i++) {
    const {
      description,
      quantity,
      price,
      discount,
      vat: vatPercentage,
    } = products[i];
    const productSubTotal = price * quantity; // price without taxes
    const discountAmount = discount * quantity;
    const vatAmount =
      ((productSubTotal - discountAmount) * vatPercentage) / 100;
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

  // setSubTotal(subTotal);
  // setVat(vat);
  // setTotal(total);

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
