# Task1
My first task as an intern in TechFrame



# The problem:

There is a strict government rule that requires businesses to never superpass value of 500$ per invoice unless the product itself has a price larger than 500$, in that case one invoice should contain only that product. Businesses must create multiple invoices, distributing products across keeping in mind not to violate maximum value of invoice. Also, the government says that on one invoice, the same product cannot be repeated more than 50 times. If a customer buys the same product 100 times, that product should be separated into two different invoices for the same order.
Some products can have discounts, some products can have different VAT, you need to keep in
mind during the calculation.


## Scenario:
A customer goes to a supermarket and select 1342 products to buy, assuming products:

● 240 bottles of Water with price $0.25/bottle with VAT of: 8%

● 38 chips with price of $2.40/piece with VAT of: 8%

● 1 TV with price of $760 with VAT of: 22%

● 77 coca cola with price of $0.50/piece with VAT of 18% and discount of $0.10/piece

● 38 chocolate bars with the price of $1.25/ piece with VAT of: 22%

● 92 bottles of hand soap with the price of $3.78/ piece with VAT of: 8%

● 49 kg of fish meat with the price of $8.30/ kg with the VAT of: 18%

● 16 packages of humus with the price of $2.66/ piece with the VAT of: 18%

● 18 bottles of white wine with price of $9.20/piece with VAT of 18% and discount of $0.02/piece

● 8kg bananas with the price of $1.25/ kg with VAT of: 22%

● 22 bottles of wine with the price of $9.78/ piece with VAT of: 22%

● 10l of oil with the price of $8.30/ liter with the VAT of: 18%

● 89 packages of cigarettes with the price of $5.46/ piece with the VAT of: 22%

● 33 packs of cookies with the price of $1.34/ per package with the VAT of: 8%

● 14 yogurts with the price of $0.66/ per piece with the VAT of: 18%

● 11 packages of bleach with the price of $1.23/ piece with the VAT of: 22%

● 85 packages of napkins with the price of $0.21/ piece with the VAT of: 8%

● 104 eggs with the price of $0.16/ per piece with the VAT of: 18%

● 398 plastic bags with the price of $0.05/ per piece with the VAT of: 18%

● 21 aluminum foils with the price of $1.12/ per piece with the VAT of: 8%

● 51 razors with the price of $8.10/ per piece with the VAT of: 8%

● 205 lotions with the price of $12/ per piece with the VAT of: 22%


## Expected algorithm
You need to create an algorithm that takes as an input list of products that the user has bought and calculate for this order: Sub total, VAT, Total. And then based on the government rules generate invoices, depending on what the customer bought it may need to generate 1+ invoice for that order.

## Technology constraints:
If you are building a frontend project, you need to create this algorithm and create a UI that the customer can simulate the checkout process, selecting products and adding them into the cart and checkout process. As the last step you need to calculate the totals and display the invoices for that order.
If you are building a backend project, you need to create this algorithm and generate JSON objects for each invoice and order totals. Also define a JSON structure and how to pass the product list to do the calculations

