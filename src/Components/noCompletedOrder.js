import React from "react";
import Image from "../Assets/image/bro.png";

const noCompletedOrder = ({title}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <div className=" tablet:w-[280px]" >
      <img src={Image} alt="wall" className="laptop:h-full laptop:w-full tablet:h-full" />
      </div>
      <div className="flex flex-col mt-6 mb-12 text-[#AAAAAA] laptop:text-[25px] tablet:text-[22px] text-[21px] items-center font-bold">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default noCompletedOrder;
