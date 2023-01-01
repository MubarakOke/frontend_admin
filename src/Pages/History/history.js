import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerButton";
import { Calendar } from "react-calendar";
import { setDateOrder } from '../../Redux/actionCreators/orderAction';
import './calendar.css';

const History = () => {
  const location= useLocation()
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const selectedDate= useSelector((state)=>state.selectedDate)
  
  const [hamburger, setHamburger] = React.useState(0);
  const [activetab, setActivetab] = React.useState(location.pathname.includes("/history/date")?2:location.pathname.includes("/history/thisweek")?1:0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    navigate("/history/date")
  }
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
      {/* --------------Navigation begins------------------ */}
      <Navbar title="History" hamburger={hamburger} setHamburger={setHamburger}/> 
      {/* --------------Navigation ends------------------ */}
      {/* --------------Blurring div starts------------------ */}
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm" : ""} h-screen`}>
      {/* --------------Home navigation begins------------------ */}
      <div className={"z-50 tablet:pt-[70px] pt-[87px]"}>
        <div className=" px-6 tablet:w-[calc(100%-220px)] w-full fixed bg-[#F4F4F4] flex justify-center">
          <div className="tablet:w-[50%]  w-[80%] flex items-center justify-between">
            <Link
              to="/history/today"
              onClick={() => setActivetab(0)}
              className={`${
                activetab === 0
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Today
            </Link>
            <Link
              to="/history/thisweek"
              onClick={() => setActivetab(1)}
              className={`${
                activetab === 1
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              This week
            </Link>
            <Link
              to="/history/date"
              onClick={(event) =>{setActivetab(2); handleClick(event)}}
              className={`${
                activetab === 2
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Date
            </Link>
          </div>
          <div>
          <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}>
            <Typography className="w-[270px] " sx={{ p: 2 }}><Calendar onChange={(date)=>{dispatch(setDateOrder(date))}} value={new Date(selectedDate)} /></Typography>
          </Popover>
          </div>
        </div>
      </div>
      {/* --------------Home navigation ends------------------ */}
      {/* --------------page content starts------------------- */}
        <div className="font-[Roboto]"> 
          <Outlet />
        </div>
      {/* --------------page content ends------------------- */}
        </div>
        <FooterButton />
        </div>
      {/* --------------Blurring div ends------------------ */}
    </div>
  );
};

export default History;