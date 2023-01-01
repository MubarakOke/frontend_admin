import React, {useState} from "react";
import Navbar from "../../Components/navbar";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FooterButton from "../../Components/footerButton";
import toast from "react-hot-toast";
import baseAPI from "../../Api/baseApi"
import { fetchBlogger } from "../../Redux/actionCreators/bloggerAction"

const CreateBlogger = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const auth = useSelector((state) => state.auth);
  const [hamburger, setHamburger] = useState(0);
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [middlename, setMiddleName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword]= useState("")

  const handleSubmit= async ()=>{
    if (!email || !password || !confirmpassword){
        return
    }
    const formData = new FormData();
    formData.append("first_name", firstname)
    formData.append("middle_name", middlename)
    formData.append("last_name", lastname)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("confirm_password", confirmpassword)
    
    let toastID= toast.loading("Creating blogger.......", {position: "top-center", style: { color: "#0E4E48" }});
    try{
      await baseAPI.post("/blog/blogger/", formData, {headers: {"Authorization": `Bearer ${auth.token}`}});
      toast.dismiss(toastID)
      dispatch(fetchBlogger())
      toast.success("Blogger successfully created")
      navigate("/manage-blogger")
    }
    catch(err){
      toast.dismiss(toastID)
      toast.error("blogger not created")
    }
  }

  return (
    <div>
      <Navbar title="Create Blogger" hamburger={hamburger} setHamburger={setHamburger} show="admin"/>
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
      <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[105px]">
        <div onClick={() => navigate(-1)} className="rounded-full shadow-[0px_4px_40px_rgba(0,0,0,0.25)] w-[60px] h-[60px] flex items-center justify-center cursor-pointer">
          <HiChevronDoubleLeft className="text-[#333333] text-[30px]" />
        </div>
        <div className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] px-4 py-8 mt-4">
          <div className="flex flex-col">
            <label
              htmlFor="first"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              First Name:
            </label>
            <input
              id="first"
              type="text"
              value={firstname}
              onChange={(event)=>setFirstName(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="last"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Last Name:
            </label>
            <input
              id="last"
              type="text"
              value={lastname}
              onChange={(event)=>setLastName(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="other"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Other Name:
            </label>
            <input
              id="other"
              type="text"
              value={middlename}
              onChange={(event)=>setMiddleName(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="phone"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Phone:
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event)=>setPhone(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="email"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event)=>setEmail(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="password"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="comfirmPassword"
              className="font-Montserrat text-[20px] font-[600] text-[#575757] ml-1 mb-1"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="text"
              value={confirmpassword}
              onChange={(event)=>setConfirmpassword(event.target.value)}
              className="outline-none rounded-[50px] bg-[#ECECEC] p-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="outline-none bg-[#62C78A] text-[white] text-[18px] font-semibold flex justify-between items-center rounded-[29px] px-8 py-2 mt-6 cursor-pointer"
          >
            Create
          </button>
        </div>
        </div>
      </div>
      </div>
      <FooterButton />
    </div>
  );
};

export default CreateBlogger;
