export interface InvoiceItem {
  des: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  orderId: string;
  orderNo: number;
  customerDetails: string;
  shipDetails: string;
  sellerDetails: string;
  payInfo: string;
  items: InvoiceItem[];
  date: string;
  tax: number;
  taxAmount: number;
  discount: number;
  discountAmount: number;
  shipCharges: number;
  subTotal: number;
  grandTotal: number;
}