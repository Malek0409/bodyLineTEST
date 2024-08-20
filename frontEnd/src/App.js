
import { Outlet } from "react-router-dom";
import Header from "./compoments/Header"
import Footer from "./compoments/Footer"
// import { useEffect } from "react";
// import { setDataProduct } from "./redux/productSlice";
// import { useDispatch, useSelector } from "react-redux";




function App() {
  
  // const dispatch = useDispatch()
  // const productData = useSelector((state) => state.product)
  
  
  // useEffect(() => {
  //   (async() => {
  //     const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}getProduct`)
  //     const resData = await res.json()
  //     console.log(resData)

  //     dispatch(setDataProduct(resData))

  //   })()
  // }, [])
  
  return (
    <>
    
    
   <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 bg-slate-100">
        <Outlet />
      </main>
      <Footer />
    </div>
     
       
    </>
  );
}

export default App;
