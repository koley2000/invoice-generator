import { Invoice } from '@/models/Invoice';
import React, { ReactNode, createContext, useContext, useState } from 'react'


interface InvoiceContextProps {
    InvoicePdf: Blob | null;
    generateInvoice: (invoice: Invoice) => void;
    loading: boolean;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [InvoicePdf, setInvoicePdf] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(true);

    const generateInvoice = async (invoice: Invoice) => {
        try {
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ invoice: invoice }),
            });

            if (response.ok) {
                const blob = await response.blob();
                setInvoicePdf(blob);
                setLoading(false)
            } else {
                console.error('Failed to generate PDF');
                setInvoicePdf(null);
                setLoading(false);

            }
        } catch (error) {
            console.error('Error:', error);
            setInvoicePdf(null);
            setLoading(false);

        }
    };

    return (
        <InvoiceContext.Provider value={{ generateInvoice, InvoicePdf, loading }}>
            {children}
        </InvoiceContext.Provider>
    )
}

// Custom hook to use InvoiceContext
export const useInvoice = ():InvoiceContextProps =>{
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error("useInvoice must be used within a InvoiceProvider");
    }
    return context;
};
