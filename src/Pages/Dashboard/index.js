import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/navbar";
import { AiFillCar } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";
import Dash from "../../Components/dashboard";
import FooterButton from "../../Components/footerButton";
import DashboardInfo from "../../Components/dashboardInfo";
import NoRunningOrder from "../../Components/noRunningOrder";
import Map from "../../Components/map";
import { fetchDashboard } from "../../Redux/actionCreators/dashboardAction";
import toast from "react-hot-toast";

const Index = () => {
  const [hamburger, setHamburger] = useState(0);
  const [activetab, setActivetab] = useState(0);
  const dispatch= useDispatch()
  const [erranderID, setErranderID]= useState(null)
  const [position, setPosition]= useState({lat: null, long: null })
  const [webSocket, setWebSocket]= useState(null)
  const webSocketRef = React.useRef(null)
  const [toastID, setToastID]= useState(null)
  const toastIDRef = React.useRef(toastID)
  const dashboardData= useSelector(state=>state.dashboard)

  useEffect(()=>{
    if(!dashboardData){
      dispatch(fetchDashboard())
    }
  }, [dashboardData, dispatch])

  useEffect(() => {
    if (erranderID && activetab===2){
      startToaster()
      connectWebsocket(erranderID)
    }
  }, [erranderID])

  console.log("errander id",erranderID)
  console.log("toastIDRef", toastIDRef)

  // disconnet websocket when user leaves page
  useEffect(() => {
    return ()=>{
        if (webSocketRef.current){
          webSocketRef.current.close()
        }
        if (toastIDRef){
          toast.dismiss(toastIDRef.current)
        }
      }
  }, [])

  // disconnet websocket when user leaves tab
  useEffect(() => {
    if (activetab!==2){
      if (toastID){
        toast.dismiss(toastID)
        setToastID(null)
        toastIDRef.current= null
      }
      if (webSocketRef.current){
        webSocketRef.current.close()
        setWebSocket(null)
        webSocketRef.current= null
        setErranderID(null)
      }
    }
  }, [activetab])

  const connectWebsocket= (erranderID)=>{
    if (webSocketRef.current){
      webSocketRef.current.close()
    }
    let websocketConnection= new WebSocket(`ws://127.0.0.1:8000/errander/${erranderID}/`)
    setWebSocket(websocketConnection)
    webSocketRef.current= websocketConnection
  }

  const startToaster= ()=>{
    if (!position.lat && !position.long && activetab===2){
      let toastID= toast.loading("Getting errander location", {position: "top-center", style: { color: "#0E4E48" }});
      setToastID(toastID)
      toastIDRef.current= toastID
    }
  }

  if (webSocket){
    webSocket.onopen= (e)=>{
      console.log("websocket opened")
    }
    webSocket.onmessage = (e)=> {
      setPosition(JSON.parse(e.data).coordinates)
      if (toastID){
        toast.dismiss(toastID);
      }
    }
    webSocket.onerror= ()=>{
      if (toastID){
        toast.error("Unable to get errander location")
        if (webSocketRef.current){
          webSocketRef.current.close()
          setWebSocket(null)
          setErranderID(null)
          webSocketRef.current= null
        }
        toast.dismiss(toastIDRef)
        setToastID(null)
        toastIDRef.current= null
      }
    }
    webSocket.onclose = function(e) {
      console.error('Chat socket closed');
    }
  }

  return (
    <div>
      <Navbar
        title="Dashboard"
        hamburger={hamburger}
        setHamburger={setHamburger}
        show="admin"
      />
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
        <div className={`${hamburger ? "blur-sm" : "blur-none"} h-screen pt-[110px]  z-0 px-5`}>
        {/* --------------------Dash begins-------------------------- */}
        <div className="flex justify-between">
          <Dash value={dashboardData?dashboardData.active_errander_count:""} icon={<AiFillCar />} head="Active Erranders" />
          <Dash value={dashboardData?dashboardData.completed_order_count:""} icon={<BiTrip />} head="Completed Errand" />
        </div>
        {/* --------------------Dash ends-------------------------- */}

        {/* -----------------content begins-------------------------- */}

        <div className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] p-3 mt-3">
          {/* --------------------Tabs start----------------------------------- */}
          <div className="w-[90%] mx-auto mb-4">
            <div className="flex items-center justify-between w-full">
              <div
                onClick={() => setActivetab(0)}
                className={`${
                  activetab === 0
                    ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                    : "text-[#999A9A]"
                } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
              >
                Errander
              </div>
              <div
                onClick={() => setActivetab(1)}
                className={`${
                  activetab === 1
                    ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                    : "text-[#999A9A]"
                } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
              >
                Customer
              </div>
              <div
                onClick={() => setActivetab(2)}
                className={`${
                  activetab === 2
                    ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                    : "text-[#999A9A]"
                } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
              >
                Activity
              </div>
            </div>
          </div>
          {/* --------------------Tabs ends----------------------------------- */}
          {/* ------------------Table starts--------------------- */}

          {activetab === 0 && (
            <DashboardInfo
              colh1="Name"
              colh2="ID"
              colh3="Location"
              content={dashboardData?dashboardData.active_errander:[]}
              contentName="errander"
              setErranderID={setErranderID}
              setActivetab={setActivetab}
            />
          )}
          {activetab === 1 && (
            <DashboardInfo
              colh1="Name"
              colh2="Phone Number"
              colh3="status"
              content={dashboardData?dashboardData.active_customer:[]}
              contentName="customer"
            />
          )}
          {activetab === 2 && (
            <div className="">
              {erranderID? <Map position={{lat: position.lat, lng: position.long}} />:<NoRunningOrder />}
            </div>
          )}

          {/* ------------------Table ends--------------------- */}
        </div>

        {/* ------------------------Content End------------------- */}
        </div>
      </div>
      <FooterButton />
    </div>
  );
};

export default Index;
