import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerButton";

const Monitor = () => {
  const location= useLocation()
  const [hamburger, setHamburger] = React.useState(0);
  const [activetab, setActivetab] = React.useState(location.pathname.includes("/monitor/customer")?1:0);
  
  return (
    <div>
      <Navbar title="Monitor" hamburger={hamburger} setHamburger={setHamburger} show="admin"/>
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm" : ""} h-screen`}>
        <div className="w-[55%] mx-auto mb-4 pt-[105px]">
          <div className="flex items-center justify-between w-full">
            <Link
              to="/monitor/errander"
              onClick={() => setActivetab(0)}
              className={`${
                activetab === 0
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Errander
            </Link>
            <Link
              to="/monitor/customer"
              onClick={() => setActivetab(1)}
              className={`${
                activetab === 1
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Customer
            </Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      </div>
    <FooterButton />
    </div>
  );
};

export default Monitor;
