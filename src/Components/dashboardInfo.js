import React from "react";

const ErranderInfo = ({ colh1, colh2, colh3, content, contentName, setErranderID, setActivetab }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1 bg-[#D7EBE2] py-2 px-1 mb-2">
        <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
          {colh1}
        </div>
        <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
          {colh2}
        </div>
        <div className="text-center text-[15px] font-black text-[#05365A] font-[Montserrat]">
          {colh3}
        </div>
      </div>
      <div>
        {contentName === "errander" && content?
          content.map((value, id) => {
            return (
              <div
                key={id}
                className="grid grid-cols-3 gap-3 border-b-[1px] py-2 hover:bg-[#EAF3EF] font-[Montserrat] font-medium text-[14px]"
              >
                <div onClick={setErranderID?()=>{setActivetab(2); setErranderID(value.id)}:null} className="text-center text-[#05365A] capitalize cursor-pointer">{value.fullname}</div>
                <div onClick={setErranderID?()=>{setActivetab(2); setErranderID(value.id)}:null} className="text-center text-[#05365A] cursor-pointer">{value.id}</div>
                <div className="text-center text-[#05365A] capitalize">{value.city}</div>
              </div>
            );
          }):""}
        {contentName === "customer" && content?
          content.map((value, id) => {
            return (
              <div
                key={id}
                className="grid grid-cols-3 gap-3 border-b-[1px] py-2 font-[Montserrat] font-medium text-[14px]"
              >
                <div className="text-center text-[#05365A] capitalize">{value.fullname}</div>
                <div className="text-center text-[#05365A]">{value.user.phone}</div>
                <div className="text-center text-[#05365A] capitalize">{value.is_verified?"verified":"not verified"}</div>
              </div>
            );
          }):""}
      </div>
    </div>
  );
};

export default ErranderInfo;
