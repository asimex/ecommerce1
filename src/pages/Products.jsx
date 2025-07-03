import React from 'react'
import { Footer, Navbar, Product } from "../components"
import { useEnkindlSave } from "../asimex/scripts/enkindlInject";

const Products = () => {
    useEnkindlSave();
  return (
    <>
      <Navbar />
      <Product />
      <Footer />
    </>
  )
}

export default Products