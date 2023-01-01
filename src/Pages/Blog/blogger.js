import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Components/navbar";
import { HiOutlinePencil, HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { fetchBlogger } from "../../Redux/actionCreators/bloggerAction"
import FooterButton from "../../Components/footerButton";
import toast from "react-hot-toast";
import baseAPI from "../../Api/baseApi"


const Blogger = () => {
  const [hamburger, setHamburger] = React.useState(0);
  const dispatch= useDispatch()
  const auth = useSelector((state) => state.auth);
  const bloggerData= useSelector((state)=>state.BloggerList)

  useEffect(()=>{
    if(!bloggerData){
      dispatch(fetchBlogger())
    }
  }, [bloggerData, dispatch])

  const fetchPreviousPost= (url)=>{
    dispatch(fetchBlogger(url))
  }

  const fetchNextPost= (url)=>{
    dispatch(fetchBlogger(url))
  }

  const handleDelete= async (id)=>{
    if (id){
        let toastID= toast.loading("deleting blogger......", {position: "top-center", style: { color: "#0E4E48" }});
        try{
          const response= await baseAPI.delete(`/blog/blogger/${id}/`, {headers: {"Authorization": `Bearer ${auth.token}`}});
          dispatch(fetchBlogger())
          toast.dismiss(toastID)
          toast.success("blogger deleted successfully")
        }
        catch(err){
          toast.dismiss(toastID)
          toast.error("blogger not deleted")
        }
    }
}

  return (
    <div>
      <Navbar title="Manage Blogger" hamburger={hamburger} setHamburger={setHamburger} show="admin"/>
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
      <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[110px]">
        <div className="flex justify-end">
          <Link
            to="/create-blogger"
            className="outline-none bg-[#62C78A] text-[white] flex justify-between items-center rounded-[29px] px-5 py-3 w-[180px] cursor-pointer"
          >
            <HiOutlinePencil className="text-[20px]" />
            Create Blogger
          </Link>
        </div>

        <div className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] p-3 mt-3">
          <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2 mt-4">
            <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
              Blogger Name
            </div>
            <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
              Phone Number
            </div>
            <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
              Action
            </div>
          </div>
          <div>
            {bloggerData&& bloggerData.results?bloggerData.results.map((value, id) => {
              return (
                <div
                  key={id}
                  className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium tablet:text-[18px] text-[14px]"
                >
                  <div className="text-center text-[#05365A] tablet:text-[18px]">{value.fullname}</div>
                  <div className="text-center text-[#05365A] tablet:text-[18px]">
                    {value.user.phone}
                  </div>
                  <div onClick={()=>{handleDelete(value.id)}} className="text-center text-[red] cursor-pointer">
                    Delete
                  </div>
                </div>
              );
            }):""}
          </div>
          <div className="flex justify-end mt-6 z-40">
            {bloggerData&&bloggerData.previous? 
              <div onClick={()=>{fetchPreviousPost(bloggerData.previous)}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
                <HiArrowNarrowLeft className="text-[18px]" />
                <span className="ml-2 text-[16px]">Back</span>
              </div>:""}
            {bloggerData&&bloggerData.next? 
              <div onClick={()=>{fetchNextPost(bloggerData.next)}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
                Next
              </div>: ""}
          </div>
        </div>
        </div>
      </div>
      </div>
      <FooterButton />
    </div>
  );
};

export default Blogger;











  

