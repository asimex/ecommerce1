import { Navbar, Main, Product, Footer } from "../components";import { useEnkindlSave } from "../asimex/scripts/enkindlInject";


function Home() {
    useEnkindlSave();
  return (
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home