import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerButton";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { fetchSelectedCustomer } from "../../Redux/actionCreators/customerAction";
import Avatar from "../../Assets/image/Avatar.jpg";

const CustomerDetail= ()=> {
    const [hamburger, setHamburger] = useState(0)
    const selectedCustomer = useSelector((state) => state.SelectedCustomer)
    const navigate= useNavigate()
    const params= useParams()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        if(!selectedCustomer){
            dispatch(fetchSelectedCustomer(params.id))
        }
    }, [dispatch, params.id])

    return (
      <div>
        <Navbar
          title="Customer Info"
          hamburger={hamburger}
          setHamburger={setHamburger}
        />
        {selectedCustomer?
          <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[230px]">
          <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
          <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[90px]">
          {/* ---------page content begin------- */}
          {/* --------back button start------- */}
            <MdOutlineArrowBackIosNew onClick={() => navigate(-1)} className="text-[#0E4E48] text-[22px] cursor-pointer" />
          {/* --------back button end------- */}
          <div className="flex tablet:mt-10 laptop:h-[250px] laptop:w-[250px] justify-center items-center laptop:absolute laptop:top-[45px] laptop:right-[20px]">
            <img src={selectedCustomer.picture? selectedCustomer.picture:Avatar} alt="" className="laptop:h-[200px] border border-[grey] rounded-full laptop:w-[200px] h-[150px] w-[150px]" />
          </div>
          <div className="flex flex-col mt-5">
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Last Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedCustomer.user.last_name}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">First Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedCustomer.user.first_name}</span>
          </div>
          {selectedCustomer.user.middle_name? <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Other Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedCustomer.user.middle_name}</span>
          </div>:""}
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Phone Number</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedCustomer.user.phone}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Email</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedCustomer.user.email}</span>
          </div>
        </div>
          {/* -------page content end------- */}
            </div>
          </div>
        </div>:""}
        <FooterButton/>
      </div>
    );
}

export default CustomerDetail