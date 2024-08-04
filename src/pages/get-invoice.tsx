import { useInvoice } from '@/context/InvoiceContext';
import Link from 'next/link';
import PSPDFKit, { Instance } from "pspdfkit";
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function getInvoice() {
    const { InvoicePdf, loading } = useInvoice();


    const downloadInvoice = () => {
        if (InvoicePdf) {
            const url = window.URL.createObjectURL(InvoicePdf);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }

    // const printInvoice = () => {
    //     if (InvoicePdf) {
    //         const url = window.URL.createObjectURL(InvoicePdf);
    //         const iframe = document.createElement('iframe');
    //         iframe.style.position = 'fixed';
    //         // iframe.style.width = '100%';
    //         // iframe.style.height = '100%';
    //         // iframe.style.border = 'none';
    //         iframe.src = url;
    //         document.body.appendChild(iframe);
    //         iframe.onload = () => {
    //             iframe.contentWindow?.print();
    //             document.body.removeChild(iframe);
    //         };
    //     }
    // }

    return (
        <>
            {loading ?
                <div className='h-screen flex flex-col items-center justify-center' >
                    <TailSpin color="red" radius={"5rem"} />
                    <span className='pt-4'>Please wait...</span>
                </div>
                :
                (<div className="bg-white">
                    <div className="relative isolate px-6 pt-6 lg:px-9">
                        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                            <div className="text-center">
                                <h4 className="font-bold tracking-tight text-gray-900 text-2xl">Your Invoice has been Successfully Generated</h4>
                                <p className="mt-3 text-lg leading-8 text-gray-600">Download or Print your Invoice</p>
                                <div className="mt-7 flex items-center justify-center gap-x-6">
                                    {/* <button className="inline-block rounded border border-current px-4 py-2 text-sm font-medium text-blue-700 transition hover:scale-110 hover:shadow-xl 
                            focus:outline-none focus:ring active:text-blue-600" onClick={printInvoice}>Print</button> */}
                                    <button className="inline-block rounded border border-current px-4 py-2 text-sm font-medium text-white bg-green-600 transition hover:scale-110 hover:shadow-xl 
                            focus:outline-none focus:ring active:bg-green-600" onClick={downloadInvoice}>Download</button>
                                </div>
                                <button className="rounded-md bg-teal-600 mt-12 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:scale-110 hover:shadow-xl 
                            hover:bg-teal-600 focus:ring focus-visible:outline-none">
                                    <Link href="/">Back to Homepage</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default getInvoice;
