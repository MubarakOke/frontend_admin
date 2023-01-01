import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { HiArrowNarrowLeft } from "react-icons/hi"
import { fetchErranderRequested, fetchErranderVerified, fetchErranderDeclined, setSelectedErrander } from "../../Redux/actionCreators/erranderAction";
import { showSpinner, hideSpinner } from "../../Redux/actionCreators/spinnerAction";

const ErranderMonitor = () => {
  const [subtab, setSubtab] = useState(0);
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const auth = useSelector((state) => state&&state.auth?state.auth:null)
  const requestedErrander= useSelector(state=>state.RequestedErrander)
  const verifiedErrander= useSelector(state=>state.VerifiedErrander)
  const declinedErrander= useSelector(state=>state.DeclinedErrander)

  useEffect(()=>{
    if(!requestedErrander){
      dispatch(fetchErranderRequested())
    }
  }, [requestedErrander, dispatch])

  useEffect(()=>{
    if(!verifiedErrander){
      dispatch(fetchErranderVerified())
    }
  }, [verifiedErrander, dispatch])

  useEffect(()=>{
    if(!declinedErrander){
      dispatch(fetchErranderDeclined())
    }
  }, [declinedErrander, dispatch])

  const handleVerifyButtonClick= async (id, fetchRequestederranderData, fetchDeclinederranderData)=>{
    if(auth && auth.token){
      try {
        dispatch(showSpinner())
        const response = await baseApi.put(`errander/verify/${id}/`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(fetchErranderVerified())
        if(fetchRequestederranderData){
          dispatch(fetchErranderRequested())
        }
        if(fetchDeclinederranderData){
          dispatch(fetchErranderDeclined())
        }
        dispatch(hideSpinner());
        toast.success(
          `Errander ${id} verified`
        );
      } 
      catch {
        dispatch(hideSpinner());
        toast.error(
          "Unable to verify errander"
        );
      }
    }
  }

  const handleDeclineButtonClick= async (id, fetchRequestederranderData, fetchVerifiedErranderData)=>{
    if(auth && auth.token){
      try {
        dispatch(showSpinner())
        const response = await baseApi.put(`errander/decline/${id}/`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(fetchErranderDeclined())
        if(fetchRequestederranderData){
          dispatch(fetchErranderRequested())
        }
        if(fetchVerifiedErranderData){
          dispatch(fetchErranderVerified())
        }
        dispatch(hideSpinner());
        toast.success(
          `Errander ${id} declined`
        );
      } 
      catch {
        dispatch(hideSpinner());
        toast.error(
          "Unable to verify errander"
        );
      }
    }
  }

  const fetchNextPost= (url, content)=>{
    if(content==="requestedErrander"){
      dispatch(fetchErranderRequested(url))
    }
    if(content==="verifiedErrander"){
      dispatch(fetchErranderVerified(url))
    }
    if(content==="declinedErrander"){
      dispatch(fetchErranderDeclined(url))
    }
  }

  const fetchPreviousPost= (url, content)=>{
    if(content==="requestedErrander"){
      dispatch(fetchErranderRequested(url))
    }
    if(content==="verifiedErrander"){
      dispatch(fetchErranderVerified(url))
    }
    if(content==="declinedErrander"){
      dispatch(fetchErranderDeclined(url))
    }
  }

  return (
    <div className="px-6 z-5 tablet:mb-[50px] mb-[95px]">
      <div className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] p-3 mt-3">
        {/* --------------------Tabs start----------------------------------- */}
        <div className="w-[90%] mx-auto mb-4">
          <div className="flex items-center justify-around w-full">
            <div
              onClick={() => setSubtab(0)}
              className={`${
                subtab === 0
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Request
            </div>
            <div
              onClick={() => setSubtab(1)}
              className={`${
                subtab === 1
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Verified
            </div>
            <div
              onClick={() => setSubtab(2)}
              className={`${
                subtab === 2
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Declined
            </div>
          </div>
        </div>

        {/* --------------------Tabs Ends---------------------------------- */}

        {/* --------------------Table start---------------------------------- */}
        {/* --------------------Table tab1 contents---------------------------------- */}

        {subtab === 0 && (
          <div>
            <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2">
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander Name
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander ID
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Action
              </div>
            </div>
            <div>
              {requestedErrander? requestedErrander.results.map((value, id) => {
                return (
                  <div
                    key={id}
                    className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium text-[14px]"
                  >
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">
                      {value.fullname}
                    </div>
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.id}</div>
                    <div className="flex justify-center items-start">             
                        <div onClick={()=>{handleVerifyButtonClick(value.id, true, false)}} className="rounded-l-[29px] tablet:text-[16px] bg-[#62C78A] tablet:px-4 px-2 py-2 mr-2 text-[11px] cursor-pointer">
                          Verify
                        </div>
                        <div onClick={()=>{handleDeclineButtonClick(value.id, true, false)}} className="rounded-r-[29px] tablet:text-[16px] bg-[#FF6666] tablet:px-4 px-2 py-2 text-[11px] cursor-pointer">
                          Decline
                        </div>            
                    </div>
                  </div>
                );
              }):""}
            </div>
            <div className="flex justify-end mt-6 z-40">
              {requestedErrander&&requestedErrander.previous? 
                <div onClick={()=>{fetchPreviousPost(requestedErrander.previous, "requestedErrander")}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
                  <HiArrowNarrowLeft className="text-[18px]" />
                  <span className="ml-2 text-[16px]">Back</span>
                </div>:""}
              {requestedErrander&&requestedErrander.next? 
                <div onClick={()=>{fetchNextPost(requestedErrander.next, "requestedErrander")}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
                  Next
                </div>: ""}
            </div>
          </div>
        )}

        {/* --------------------Table tab2 contents---------------------------------- */}

        {subtab === 1 && (
          <div>
            <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2">
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander Name
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander ID
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Action
              </div>
            </div>
            <div>
              {verifiedErrander? verifiedErrander.results.map((value, id) => {
                return (
                  <div
                    key={id}
                    className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium text-[14px]"
                  >
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">
                      {value.fullname}
                    </div>
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.id}</div>
                    <div className=" text-center text-[#05365A] tablet:text-[18px flex items-start justify-center">
                      <div onClick={()=>{handleDeclineButtonClick(value.id, false, true)}} className="bg-[#FF6666] tablet:text-[16px] rounded-[29px] text-[#fff] text-[11px] cursor-pointer tablet:px-5 px-3 py-2">
                        Decline
                      </div>
                    </div>
                  </div>
                );
              }):""}
            </div>
            <div className="flex justify-end mt-6 z-40">
              {verifiedErrander&&verifiedErrander.previous? 
                <div onClick={()=>{fetchPreviousPost(verifiedErrander.previous, "verifiedErrander")}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
                  <HiArrowNarrowLeft className="text-[18px]" />
                  <span className="ml-2 text-[16px]">Back</span>
                </div>:""}
              {verifiedErrander&&verifiedErrander.next? 
                <div onClick={()=>{fetchNextPost(verifiedErrander.next, "verifiedErrander")}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
                  Next
                </div>: ""}
            </div>
          </div>
        )}
        {/* --------------------Table tab3 contents---------------------------------- */}

        {subtab === 2 && (
          <div>
            <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2">
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander Name
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Errander ID
              </div>
              <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
                Action
              </div>
            </div>
            <div>
              {declinedErrander? declinedErrander.results.map((value, id) => {
                return (
                  <div
                    key={id}
                    className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium text-[14px]"
                  >
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">
                      {value.fullname}
                    </div>
                    <div onClick={()=>{dispatch(setSelectedErrander(value)); navigate(`/monitor/errander/${value.id}`)}} className="text-center text-[#05365A] tablet:text-[18px] cursor-pointer">{value.id}</div>
                    <div className=" text-center text-[#05365A] flex items-start justify-center">
                      <div onClick={()=>{handleVerifyButtonClick(value.id, false, true)}} className="tablet:text-[16px] bg-[#62C78A] rounded-[29px] text-[#fff] text-[11px] cursor-pointer tablet:px-5 px-3 py-2">
                        Verify
                      </div>
                    </div>
                  </div>
                );
              }):""}
            </div>
            <div className="flex justify-end mt-6 z-40">
              {declinedErrander&&declinedErrander.previous? 
                <div onClick={()=>{fetchPreviousPost(declinedErrander.previous, "declinedErrander")}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
                  <HiArrowNarrowLeft className="text-[18px]" />
                  <span className="ml-2 text-[16px]">Back</span>
                </div>:""}
              {declinedErrander&&declinedErrander.next? 
                <div onClick={()=>{fetchNextPost(declinedErrander.next, "declinedErrander")}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
                  Next
                </div>: ""}
            </div>
          </div>
        )}
        {/* --------------------Table ends---------------------------------- */}
      </div>
    </div>
  );
};

export default ErranderMonitor;

//colh1, colh2, colh3, content, contentName
