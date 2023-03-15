import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";

const Navbar = (props: any) => {
  return (
    <div className="py-4 border border-gray-200 px-9 flex justify-between items-center">
      <p className="text-xl font-semibold">XTodo</p>
      <AiFillSetting
      
        className="text-2xl cursor-pointer"
        onClick={() => props.setSettingOpen(!props.settingOpen)}
      />
    </div>
  );
};

export default Navbar;
