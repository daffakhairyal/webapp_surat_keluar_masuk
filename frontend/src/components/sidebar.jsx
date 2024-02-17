/* eslint-disable no-unused-vars */
// Mengimpor komponen React dan ikon yang diperlukan
import React, { useState } from 'react';
import { BsArrowLeftShort, BsFillHouseDoorFill } from "react-icons/bs";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { BiChevronDown } from 'react-icons/bi';
import { TbReport } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut,reset } from '../features/authSlice';

// Mendefinisikan komponen Sidebar
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
  
    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };
  
    const [open, setOpen] = useState(true);
    const [activeSubMenus, setActiveSubMenus] = useState({});
  
    const toggleSubMenu = (submenuName) => {
      console.log("Toggling submenu:", submenuName); // Menambahkan console log saat submenu ditoggle
      setActiveSubMenus((prevState) => ({
        ...prevState,
        [submenuName]: !prevState[submenuName],
      }));
    };
  
    console.log("User:", user); // Menambahkan console log untuk menampilkan data user
  
    return (
      <div className="flex">
        <div
          className={`bg-orange-900 h-screen p-5 pt-8 ${
            open ? "w-72" : "w-20"
          } duration-500 relative`}
        >
          <div className="inline-flex">
            <h1
              className={`text-gray-200 ${
                open ? "text-2xl" : "text-4xl"
              } duration-500 font-bold `}
            >
              <span className="">D</span>
              <span className={`text-2xl duration-200 ${!open && "opacity-0"}`}>
                ashboard
              </span>
            </h1>
          </div>
          <BsArrowLeftShort
            className={`bg-white text-dark text-4xl rounded-full 
              absolute -right-3 top-9 border border-orange-950 cursor-pointer ${
                !open && "rotate-180"
              } duration-500`}
            onClick={() => {
              console.log("Toggling sidebar"); // Menambahkan console log saat sidebar ditoggle
              setOpen(!open);
            }}
          />
  
          {/* Item menu "Home" */}
          <div
            className={`mt-3 flex items-center text-gray-200 rounded-md  ${
              open ? "text-lg p-1.5" : "text-2xl p-1"
            } duration-500 cursor-pointer hover:bg-orange-100 hover:text-black`}
            onClick={() => toggleSubMenu("Home")}
          >
            <span>
              <BsFillHouseDoorFill className={` `} />
            </span>
            <span className={` ml-4 ${!open && "opacity-0"} `}>Home</span>
          </div>
  
          {/* Submenu "File" */}
          <div
            className={`mt-3 flex items-center justify-between text-gray-200 rounded-md 
          ${open ? "text-lg p-1.5" : "text-2xl p-1"} duration-500 cursor-pointer hover:bg-orange-100 hover:text-black`}
            onClick={() => toggleSubMenu("File")}
          >
            <div className="flex items-center">
              <span>
                <IoFileTrayStackedSharp className={``} />
              </span>
              <span className={`ml-4 ${!open && "opacity-0"}`}>File</span>
            </div>
            <span
              className={`transform ${
                activeSubMenus["File"] ? "rotate-180" : ""
              } duration-500 ${!open && "opacity-0"}`}
            >
              <BiChevronDown />
            </span>
          </div>
  
          {/* Item submenu "File" */}
          <div
            className={`leading-7 flex-row items-center text-gray-200 font-thin mt-2 w-4/5 mx-auto transition-opacity duration-500 ${
              activeSubMenus["File"] ? "opacity-100" : "opacity-0"
            } ${activeSubMenus["File"] ? "h-auto" : "h-0"} overflow-hidden`}
          >
            <h1 className="cursor-pointer p-2 hover:text-white duration-500 rounded-md mt-1">
              Surat Masuk
            </h1>
            <h1 className="cursor-pointer p-2 hover:text-white duration-500 rounded-md mt-1">
              Surat Keluar
            </h1>
          </div>
  
          {/* Submenu "Report" */}
          <div
            className={`mt-1 flex items-center justify-between text-gray-200 rounded-md 
          ${open ? "text-lg p-1.5" : "text-2xl p-1"} duration-500 cursor-pointer hover:bg-orange-100 hover:text-black`}
            onClick={() => toggleSubMenu("Report")}
          >
            <div className="flex items-center">
              <span>
                <TbReport className={``} />
              </span>
              <span className={`ml-4 ${!open && "opacity-0"}`}>Report</span>
            </div>
            <span
              className={`transform ${
                activeSubMenus["File"] ? "rotate-180" : ""
              } duration-500 ${!open && "opacity-0"}`}
            >
              <BiChevronDown />
            </span>
          </div>
  
          {/* Item submenu "Report" */}
          <div
            className={`leading-7 flex-row items-center text-gray-200 font-thin mt-2 w-4/5 mx-auto transition-opacity duration-500 ${
              activeSubMenus["Report"] ? "opacity-100" : "opacity-0"
            } ${activeSubMenus["Report"] ? "h-auto" : "h-0"} overflow-hidden`}
          >
            <h1 className="cursor-pointer p-2 hover:text-white duration-500 rounded-md mt-1">
              Surat Masuk
            </h1>
            <h1 className="cursor-pointer p-2 hover:text-white duration-500 rounded-md mt-1">
              Surat Keluar
            </h1>
          </div>
  
          {/* Garis pemisah */}
          {open ? (
            <hr className={"w-full my-2 border-white"} />
          ) : (
            <></>
          )}
  
          {/* Item menu "Admin" */}
          {user && user.role === "admin" && (
            <div
              className={`mt-3 flex items-center text-gray-200 rounded-md ${
                open ? "text-lg p-1.5" : "text-2xl p-1"
              } duration-500 cursor-pointer hover:bg-orange-100 hover:text-black`}
              onClick={() => toggleSubMenu("Admin")}
            >
              <span>
                <FaUser className={` `} />
              </span>
              <span className={`ml-4 ${!open && "opacity-0"}`}>Admin</span>
            </div>
          )}
  
          {/* Anda dapat menambahkan lebih banyak item submenu di sini dengan pola yang serupa */}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  
