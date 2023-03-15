import React, { useState } from "react";

const SettingDropdown = (props: any) => {
  const [toggle, setToggle] = useState(false);

  let toggleClass;

  if (toggle === false) {
    toggleClass = "justify-start";
  } else {
    toggleClass = "justify-end";
  }

  const handledark = () => {
    setToggle(!toggle);
    props.setDarkMode(!props.darkMode);
  };

  return (
    <div className="">
      <ul>
        <div className="flex justify-between">
          <div className="">darkmode</div>
          <div
            className={
              "flex w-12 bg-white border border-gray-300 " + toggleClass
            }
          >
            <div
              onClick={handledark}
              className="bg-black w-6 cursor-pointer  "
            ></div>
          </div>
        </div>
        <li className="">default priority</li>
        <li className="">default date</li>
      </ul>
    </div>
  );
};

export default SettingDropdown;
