import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdManageAccounts } from "react-icons/md"
import { FaHistory } from "react-icons/fa";
import { MdOutlineMonitor } from "react-icons/md";

const dashboard = <MdDashboard />; 
const monitor= <MdOutlineMonitor size="27"/>;
const history= <FaHistory />;
const manage_blogger = <MdManageAccounts size="27" />


const FootbarContent = [
  {
    link: "/dashboard",
    icon: dashboard,
    title: "Dashboard",
  },
  {
    link: "/monitor",
    icon: monitor,
    title: "Monitor",
  },
  {
    link: "/history",
    icon: history,
    title: "History",
  },
  {
    link: "/manage-blogger",
    icon: manage_blogger,
    title: "Manage Blogger",
  },
]

function FooterButton() {
    const location = useLocation();

    const renderFootbarContent= ()=>{
        return FootbarContent.map((item, index)=>{
            return (
                    <Link
                    to={item.link}
                    key={index}
                    className={`justify-self-center text-[23px] p-8 flex hover:text-[#0E4E48] ${
                      location.pathname.includes(item.link)
                        ? "text-[#0E4E48]"
                        : "text-[#A6B7AF]"
                    }`}
                    >
                    {item.icon}
                    </Link>
                    )
        })
    }


    return (
    <div className="fixed bottom-[0px] tablet:w-[calc(100%-220px)] w-[100%] z-20">
        {/* -------------Add footer buttons start-------------- */}
        <div className="flex justify-evenly h-[75px] tablet:hidden items-center bg-[#F4F4F4]">
            {renderFootbarContent()}
        </div>
        {/* -------------Add footer buttons ends-------------- */}
    </div>
  )
}

export default FooterButton