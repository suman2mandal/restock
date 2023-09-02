import Footer from '@/app/components/Footer/Footer'
import Navbar from '@/app/components/Navbar/Navbar'
import ProductDetails from '@/app/components/products/components/PcComponentsProductDetails/ProductDetails'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <div className="mt-20">
      <ProductDetails/>
      </div>
      <Footer/>
    </div>
  )
}

export default page