import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { RxCross1 } from "react-icons/rx";
import { Invoice } from '../models/Invoice';
import { useRouter } from 'next/router';
import { useInvoice } from '@/context/InvoiceContext';

// interface InvoiceFormProps {
//     onSubmit: (invoice: Invoice) => void;
// }

const generateInvoice: React.FC = () => {
    const [addDis, setAddDis] = useState(false);
    const [addShip, setAddShip] = useState(false);

    const router = useRouter();

    const { generateInvoice } = useInvoice();


    const [invoice, setInvoice] = useState<Invoice>({
        orderNo: 0,
        customerDetails: '',
        shipDetails: '',
        sellerDetails: '',
        payInfo: '',
        items: [{ des: '', qty: 1, rate: 0, amount: 0 }],
        date: '',
        orderId: '',
        tax: 0,
        taxAmount: 0,
        discount: 0,
        discountAmount: 0,
        shipCharges: 0,
        subTotal: 0,
        grandTotal: 0,
    });

    const addItem = (e:any) => {
        e.preventDefault();
        setInvoice((prevItem) => ({
            ...prevItem,
            items: [...prevItem.items, { des: '', qty: 1, rate: 0, amount: 0 }]
        }));
    };

    const removeItem = (index: number) => {
        setInvoice((prevItem) => ({
            ...prevItem,
            items: prevItem.items.filter((_, i) => i !== index),
        }))
    }

    const handleItemChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const items = [...invoice.items];
        items[index] = { ...items[index], [name]: value };
        setInvoice({ ...invoice, items });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInvoice({
            ...invoice,
            [name]: name === 'shipCharges' || name === 'tax' || name === 'discount' ? parseFloat(value) : value
        });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent the default form submission (page reload)
        // Perform your state management or function calls here
        console.log(invoice);
        generateInvoice(invoice);
        router.push('/get-invoice');
    };

    const calculateTotal = () => {
        const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
        const discountAmount = (subtotal * invoice.discount) / 100;
        const taxAmount = ((subtotal - discountAmount) * invoice.tax) / 100;
        const totalAmount = (subtotal - discountAmount) + taxAmount + invoice.shipCharges;
        setInvoice({ ...invoice, subTotal: subtotal, grandTotal: totalAmount, taxAmount: taxAmount, discountAmount: discountAmount });
    }

    useEffect(() => {
        calculateTotal();
    }, [invoice.items, invoice.tax, invoice.discount, invoice.shipCharges])

    return (
        <div className="bg-gray-100 p-6 overflow-scroll">
            <form className="lg:max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-6">
                    <div className="flex items-center justify-end">
                        {/* <div>
                            <label className="block text-gray-700 font-bold mb-2">+ Add Your Logo</label>
                            <input type="file" className="block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                        </div> */}
                        <div>
                            <h2 className="text-2xl font-bold">INVOICE</h2>
                            <div className="flex items-center mt-2">
                                <label className="block text-gray-700 font-bold mr-2">#</label>
                                <input type="text" className="block w-20 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                    name='orderNo' value={invoice.orderNo} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 mb-6 md:ml-12">
                    <div className="mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Who is this invoice from? (required)</label>
                            <textarea className="block resize-none w-3/4 text-gray-700 border rounded py-5 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                                name='sellerDetails' value={invoice.sellerDetails} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Bill To</label>
                            <textarea className="block resize-none w-3/4 text-gray-700 border rounded py-5 px-4 mb-6 leading-tight focus:outline-none focus:bg-white" placeholder="Who is this invoice to? (required)"
                                name='customerDetails' value={invoice.customerDetails} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Ship To</label>
                            <textarea className="block resize-none w-3/4 text-gray-700 border rounded py-5 px-4 leading-tight focus:outline-none focus:bg-white" placeholder="(optional)"
                                name='shipDetails' value={invoice.shipDetails} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="md:ml-16">
                        <div>
                            <label className="block text-gray-700 mb-2">Date</label>
                            <input type="date" className="block w-4/5 md:w-2/5 text-gray-700 border rounded py-2 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                                name='date' value={invoice.date} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Payment Terms</label>
                            <input type="text" className="block w-4/5 md:w-2/5 text-gray-700 border rounded py-2 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                                name='payInfo' value={invoice.payInfo} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Order ID</label>
                            <input type="text" className="block w-4/5 md:w-2/5 text-gray-700 border rounded py-2 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                                name='orderId' value={invoice.orderId} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="grid grid-cols-12 items-center bg-blue-50 p-4 rounded">
                        <label className="block text-gray-700 font-bold mb-2">Item</label>
                        <label className="hidden lg:block lg:ml-[25rem] text-gray-700 font-bold mb-2">Quantity</label>
                        <label className="hidden lg:block lg:ml-[28rem] text-gray-700 font-bold mb-2">Rate</label>
                        <label className="hidden lg:block lg:ml-[31rem] text-gray-700 font-bold mb-2">Amount</label>
                    </div>

                    {/* Items */}
                    {invoice.items.map((item, index) => (
                        <div className="flex grid-cols-12 gap-6 items-center bg-blue-50 p-4 rounded" key={index}>
                            <input type="text" className="col-span-6 md:col-span-6 block w-full text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white" placeholder="Description of service or product..."
                                name='des' value={item.des} onChange={(e) => handleItemChange(index, e)} />

                            <input type="number" className="remove-arrow col-span-3 md:col-span-2 block w-1/6 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white" placeholder="Qty"
                                name='qty' value={item.qty} onChange={(e) => handleItemChange(index, e)} />

                            <input type="number" className="remove-arrow col-span-3 md:col-span-2 block w-1/4 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white" placeholder="Rate"
                                name='rate' value={item.rate} onChange={(e) => handleItemChange(index, e)} />

                            <input type="number" className="remove-arrow hidden md:block col-span-3 md:col-span-2 w-1/3 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white" placeholder="Amt"
                                name='amount' value={item.amount = (item.qty * item.rate)} onChange={(e) => handleItemChange(index, e)} readOnly />

                            <button className='col-span-3 md:col-span-2 block' onClick={() => removeItem(index)} style={{ color: 'red' }}>
                                <RxCross1 size={20} />
                            </button>
                        </div>
                    ))}

                    <button className="mt-4 inline-block rounded border border-current px-4 py-2 text-sm font-medium text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500"
                        onClick={addItem}>+ Line Item</button>
                </div>

                <div className="flex items-center justify-end mb-6">
                    <div className="text-right">
                        <div className="flex items-center justify-end mb-2">
                            <span className="text-gray-700 mr-2">Sub Total</span>
                            <span className="text-gray-700"><span>&#8377;</span> {invoice.subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-end mb-4">
                            <span className="text-gray-700 mr-2">GST:</span>
                            <input type="number" className="remove-arrow block w-20 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white mr-2"
                                name="tax" value={invoice.tax} onChange={handleChange} />
                            <span>%</span>
                        </div>

                        {addDis &&
                            <div className="flex items-center justify-end mb-4">
                                <span className="text-gray-700 mr-2">Discount</span>
                                <input type="number" className="remove-arrow block w-20 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white mr-2"
                                    name='discount' value={invoice.discount} onChange={handleChange} />
                                <span>%</span>
                            </div>
                        }

                        {addShip &&
                            <div className="flex items-center justify-end mb-4">
                                <span className="text-gray-700 mr-2">Shipping Charges: <span>&#8377;</span> </span>
                                <input type="number" className="remove-arrow block w-20 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white mr-2"
                                    name="shipCharges" value={invoice.shipCharges} onChange={handleChange} />
                            </div>
                        }

                        <div className="flex items-center justify-end mb-5">
                            <button className={`inline-block rounded border border-current px-4 py-2 text-sm font-medium ${addDis ? 'text-red-600' : 'text-indigo-600'} transition hover:scale-110 hover:shadow-xl 
                            focus:outline-none`} onClick={() => setAddDis(!addDis)}>+ Discount</button>

                            <button className={`ml-4 inline-block rounded border border-current px-4 py-2 text-sm font-medium ${addShip ? 'text-red-600' : 'text-indigo-600'} transition hover:scale-110 hover:shadow-xl 
                            focus:outline-none`} onClick={() => setAddShip(!addShip)}>+ Shipping</button>
                        </div>

                        <div className="flex items-center justify-end">
                            <span className="text-gray-700 font-bold mr-2">Grand Total:</span>
                            <span className="text-gray-700 font-bold"><span>&#8377;</span> {invoice.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className='mb-5 flex items-center justify-center'>
                    <button type='submit' className="inline-block rounded border border-current px-4 py-2 text-sm font-medium text-white bg-green-600 transition hover:scale-110 hover:shadow-xl 
                        focus:outline-none focus:ring active:bg-green-600">Generate Invoice</button>
                </div>
            </form>
        </div>
    )
}

export default generateInvoice; 
