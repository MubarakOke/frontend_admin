import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerButton";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import Avatar from "../../Assets/image/Avatar.jpg";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { fetchErranderRequested, fetchErranderVerified, fetchErranderDeclined, fetchSelectedErrander } from "../../Redux/actionCreators/erranderAction";
import { showSpinner, hideSpinner } from "../../Redux/actionCreators/spinnerAction";

const ErranderDetail= ()=> {
    const [hamburger, setHamburger] = useState(0)
    const selectedErrander = useSelector((state) => state.SelectedErrander)
    const auth = useSelector((state) => state&&state.auth?state.auth:null)
    const navigate= useNavigate()
    const params= useParams()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        if(!selectedErrander){
            dispatch(fetchSelectedErrander(params.id))
        }
    }, [dispatch, params.id])

    const handleVerifyButtonClick= async ()=>{
        if(auth && auth.token){
          try {
            dispatch(showSpinner())
            const response = await baseApi.put(`errander/verify/${params.id}/`,
              {},
              {
                headers: {
                  "Authorization": `Bearer ${auth.token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch(fetchErranderVerified())
            dispatch(fetchErranderRequested())
            dispatch(hideSpinner());
            toast.success(
              `Errander ${params.id} verified`
            );
          } 
          catch {
            dispatch(hideSpinner());
            toast.error(
                `Unable to decline errander ${params.id}`
            );
          }
        }
      }

    const handleDeclineButtonClick= async ()=>{
        if(auth && auth.token){
          try {
            dispatch(showSpinner())
            const response = await baseApi.put(`errander/decline/${params.id}/`,
              {},
              {
                headers: {
                  "Authorization": `Bearer ${auth.token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch(fetchErranderDeclined())
            dispatch(fetchErranderRequested())
            dispatch(hideSpinner());
            toast.success(
              `Errander ${params.id} declined`
            );
          } 
          catch {
            dispatch(hideSpinner());
            toast.error(
                `Unable to decline errander ${params.id}`
            );
          }
        }
      }
      
    return (
      <div>
        <Navbar
          title="Errander Info"
          hamburger={hamburger}
          setHamburger={setHamburger}
        />
        {selectedErrander?
          <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[230px]">
          <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
          <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[90px]">
          {/* ---------page content begin------- */}
          {/* --------back button start------- */}
            <MdOutlineArrowBackIosNew onClick={() => navigate(-1)} className="text-[#0E4E48] text-[22px] cursor-pointer" />
          {/* --------back button end------- */}
          <div className="flex tablet:mt-10 laptop:h-[250px] laptop:w-[250px] justify-center items-center laptop:absolute laptop:top-[45px] laptop:right-[20px]">
            <img src={selectedErrander.picture? selectedErrander.picture:Avatar} alt="" className="laptop:h-[200px] border border-[grey] rounded-full laptop:w-[200px] h-[150px] w-[150px]" />
          </div>
          <div className="flex flex-col mt-5 justify-between">
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Last Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.user.last_name}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">First Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.user.first_name}</span>
          </div>
          {selectedErrander.user.middle_name? <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Other Name</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.user.middle_name}</span>
          </div>:""}
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Phone Number</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.user.phone}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Email</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.user.email}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Address</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.address}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">LGA</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.lga}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">City</span>
            <span className="font-bold text-[16px]">{selectedErrander.city}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Gender</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.gender}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Date of Birth</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.date_of_birth}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Education Qualification</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.education_qualification}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Internet Usage</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.internet_usage}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Deadline Handling</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.deadline_handling}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Project</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.project}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Expectation</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.expectation}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Relevant Information</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.relevant_information}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Interest</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.interest}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Familiar Location</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.familiar_location}</span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-[#AFAFAF] tablet:text-[18px] text-[15px]">Verification Status</span>
            <span className="font-bold tablet:text-[20px] text-[16px]">{selectedErrander.is_verified?"True":"False"}</span>
          </div>
        </div>
        <div className="flex justify-between mt-5 items-start">             
            {!selectedErrander.is_verified?<div onClick={()=>{handleVerifyButtonClick()}} className="bg-[#62C78A] px-5 py-2 tablet:text-[18px] text-[15px] cursor-pointer">
                Verify
            </div>:<div></div>}
            {!selectedErrander.is_declined?<div onClick={()=>{handleDeclineButtonClick()}} className="bg-[#FF6666] px-5 py-2 tablet:text-[18px] text-[15px] cursor-pointer">
                Decline
            </div>:<div></div>}           
        </div>
          {/* -------page content end------- */}
            </div>
          </div>
        </div>:""}
        <FooterButton/>
      </div>
    );
}

export default ErranderDetail