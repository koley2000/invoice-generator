import { Invoice } from '@/models/Invoice'

const invoiceTemplate = (invoice: Invoice) => {
  if (!invoice) {
    // throw new Error('Invalid customer data');
    console.log("Invalid customer data")
  }

  const itemsArray = Array.isArray(invoice.items) ? invoice.items : [];

  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <title>Template</title>
    <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 21cm;  
      height: 29.7cm; 
      margin: 0 auto; 
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
      margin-top: 4rem;
    }
    
    #logo {
      text-align: center;
      margin-bottom: 10px;
    }
    
    // #logo img {
    //   width: 90px;
    // }
    
    h1 {
      border-top: 1px solid  #5D6975;
      border-bottom: 1px solid  #5D6975;
      
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
    }
    
    .invoice-container {
      display: flex;
      justify-content: center;
      background: #fff;
      margin: auto;
      gap: 20rem;
    }
    
    .invoice-section .invoice-date{
      margin-top: 2rem;
    }
    
    .invoice-section {
      width: 25%;
    }
  
    /* .invoice-section left {
      margin-left: 5rem;
    }
     */
    .left h2, .right h2 {
      margin-bottom: 8px;
    }
    
    p {
      margin: 5px 0;
      line-height: 1.5;
    }
    
    strong {
      display: block;
      /* margin-bottom: 5px; */
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }
  /*   
    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    } */
    
    table th,
    table td {
      text-align: center;
    }
    
    table th {
      padding: 5px 20px;
      border-bottom: 1px solid #5D6975;
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table .slno,
    table .desc {
      text-align: left;
    }
    
    table td {
      padding: 20px;
      text-align: right;
    }
    
    table td.slno,
    table td.desc {
      vertical-align: top;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }
    
    table tr.subtotal {
      border-top: 1px solid #5D6975;
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;
    }
  </style>
  </head>
  
  <body>
    <header class="clearfix">
      <!-- <div id="logo">
        <img src="/logo.png">
      </div> -->
      <h1>INVOICE</h1>
      <div class="invoice-container">
        <div class="invoice-section left">
          <h2>Billing Address</h2>
          <p>${invoice.customerDetails}</p>
  
          <h2>Shipping Address</h2>
          <p>${invoice.shipDetails}</p>
        </div>
  
        <div class="invoice-section right">
          <h2>Sold By</h2>
          <p>${invoice.sellerDetails}</p>
  
          <strong class="invoice-date">Invoice Date: 20 May, 2024</strong>
          <p>Payement Info: ${invoice.payInfo}</p>
        </div>
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="slno">SL No</th>
            <th class="desc">DESCRIPTION</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${itemsArray.map((item: any, index: number) => `<tr>
            <td class="slno">${index + 1}</td>
            <td class="desc">${item.des}</td>
            <td class="unit">&#8377;${item.rate}</td>
            <td class="qty">${item.qty}</td>
            <td class="total">&#8377;${item.amount}</td>
          </tr>`)}
          <tr class="subtotal">
            <td colspan="4">SUBTOTAL</td>
            <td class="total">&#8377;${invoice.subTotal}</td>
          </tr>
          <tr>
            <td colspan="4">TAX ${invoice.tax}</td>
            <td class="total">&#8377;${invoice.taxAmount}</td>
          </tr>
          <tr>
            <td colspan="4">Discount ${invoice.discount}</td>
            <td class="total">&#8377;${invoice.discountAmount}</td>
          </tr>
          <tr>
            <td colspan="4">Shipping Charges</td>
            <td class="total">&#8377;${invoice.shipCharges}</td>
          </tr>
          <tr>
            <td colspan="4" class="grand total">GRAND TOTAL</td>
            <td class="grand total">&#8377;${invoice.grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </body>
  
  </html>
`;
}

export default invoiceTemplate;