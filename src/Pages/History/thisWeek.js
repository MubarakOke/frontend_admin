import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { fetchThisWeekOrder } from "../../Redux/actionCreators/orderAction";
import CompletedOrderModal from "../../Components/completedOrderModal"
import NoCompletedOrder from "../../Components/noCompletedOrder";


const ThisWeek = () => {
  const dispatch= useDispatch()
  const ThisWeekOrder= useSelector(state=>state.ThisWeekOrder)

  useEffect(()=>{
    if (!ThisWeekOrder){
      dispatch(fetchThisWeekOrder(1))
    }
  }, [ThisWeekOrder, dispatch])

  const fetchPreviousPost= (url)=>{
    dispatch(fetchThisWeekOrder(1, url))
  }

  const fetchNextPost= (url)=>{
    dispatch(fetchThisWeekOrder(1, url))
  }

  const renderContent= ()=>{
    if (ThisWeekOrder && ThisWeekOrder.results.length !== 0){
      return ThisWeekOrder.results.map((order, index)=>{
        return (
          <div key={index} className="laptop:w-[70]">
          <CompletedOrderModal
            key={index}
            order={order}
            arrowVisible={1}
          />
          </div>)
      })
    }
    else{
      return (
        <NoCompletedOrder title="No completed order yet for the week" />
      )
    }
  }

  return (
    <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[50px]">
      <div className="tablet:grid tablet:grid-cols-1 laptop:grid-cols-2 bigscreen:grid-cols-3 tablet:gap-2">
        {renderContent()}
      </div>
      <div className="flex justify-end mt-6 z-40">
            {ThisWeekOrder&&ThisWeekOrder.previous? 
              <div onClick={()=>{fetchPreviousPost(ThisWeekOrder.previous)}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
                <HiArrowNarrowLeft className="text-[18px]" />
                <span className="ml-2 text-[16px]">Back</span>
              </div>:""}
            {ThisWeekOrder&&ThisWeekOrder.next? 
              <div onClick={()=>{fetchNextPost(ThisWeekOrder.next)}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
                Next
              </div>: ""}
      </div>
    </div>
  );
};

export default ThisWeek;
