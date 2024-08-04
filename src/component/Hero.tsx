import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <div className="bg-white">
            <div className="relative isolate px-6 pt-6 lg:px-9">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">Online Invoice Generator</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 ">Welcome! Invoice Generator lets you 
                        instantly make invoices with our attractive invoice template straight from your web browser. The invoices you make can be downloaded 
                        as PDF.</p>
                        <div className="mt-9 flex items-center justify-center gap-x-6">
                            <Link href="/generate-invoice" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:scale-110 hover:shadow-xl 
                            hover:bg-teal-600 focus-visible:outline-none focus:ring">Get started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Hero
