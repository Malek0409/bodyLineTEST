import { Outlet } from "react-router-dom";
import Header from "./compoments/Header"
import Footer from "./compoments/Footer"



function App() {
  
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
