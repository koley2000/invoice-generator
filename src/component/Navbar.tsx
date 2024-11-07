import React from 'react'
import Image from 'next/image'


function Navbar() {

  return (
    <nav className="navbar sticky top-0 z-50 bg-[#1f2937]">
      <div className="mx-auto flex h-16 max-w-full items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-blue-400" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.png" alt="logo" width={31} height={30} style={{ width: '100%', height: 'auto' }} priority/>
        </a>

        <div className="flex flex-1 items-center justify-between">
          <div aria-label="Global" className="md:block">
            <ul className="flex items-center pt-0 bg-gray-800 z-[-1] md:z-auto md:static w-full left-0 py-0 md:pl-0 pl-0">

              <li className='md:mx-0 md:my-0'>
                <a href='/' className="text-white text-xl italic">Invoice Generator</a>
              </li>
            </ul>
          </div>

          {/* <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Login
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </nav>

  )
}

export default Navbar
