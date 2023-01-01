import React from "react";

const DashComponent = ({head, icon, value}) => {
  return (
    <div className="w-[170px] flex flex-col shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] py-3 px-4">
      <p className="text-center text-[#00000080] font-bold">{head}</p>
      <div className="flex justify-between mt-1 items-center">
        <div className="text-[30px] text-[#000]">{icon}</div>

        <p className="tablet:text-[30px] text-[25px] text-[#0E4E48] font-bold font-[roboto]">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DashComponent;
