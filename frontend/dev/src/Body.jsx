import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Body = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
