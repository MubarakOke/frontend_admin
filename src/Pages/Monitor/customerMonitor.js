import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from "react-icons/hi"
import { fetchCustomerData, setSelectedCustomer } from "../../Redux/actionCreators/customerAction";

const CustomerMonitor = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const customerData= useSelector(state=>state.CustomerList)

  useEffect(()=>{
    if(!customerData){
      dispatch(fetchCustomerData())
    }
  }, [customerData, dispatch])

  const fetchPreviousPost= (url)=>{
    dispatch(fetchCustomerData(url))
  }

  const fetchNextPost= (url)=>{
    dispatch(fetchCustomerData(url))
  }

  return (
    <div className="px-6 z-5 tablet:mb-[50px] mb-[95px]">
      <div className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] p-3 mt-3">
        <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2 mt-4">
          <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
           Customer Name
          </div>
          <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
            Customer ID
          </div>
          <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
            Phone
          </div>
        </div>
        <div>
          {customerData&&customerData.results? customerData.results.map((value, id) => {
            return (
              <div
                key={id}
                className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium text-[14px]"
              >
                <div onClick={()=>{dispatch(setSelectedCustomer(value)); navigate(`/monitor/customer/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.fullname}</div>
                <div onClick={()=>{dispatch(setSelectedCustomer(value)); navigate(`/monitor/customer/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.id}</div>
                <div onClick={()=>{dispatch(setSelectedCustomer(value)); navigate(`/monitor/customer/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.user.phone}</div>
               
              </div>
            );
          }):""}
        </div>
        <div className="flex justify-end mt-6 z-40">
          {customerData&&customerData.previous? 
            <div onClick={()=>{fetchPreviousPost(customerData.previous)}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
              <HiArrowNarrowLeft className="text-[18px]" />
              <span className="ml-2 text-[16px]">Back</span>
            </div>:""}
          {customerData&&customerData.next? 
            <div onClick={()=>{fetchNextPost(customerData.next)}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
              Next
            </div>: ""}
      </div>
      </div>
    </div>
  );
};

export default CustomerMonitor;
