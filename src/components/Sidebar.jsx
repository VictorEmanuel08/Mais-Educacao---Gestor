/* eslint-disable jsx-a11y/alt-text */
import logo from "../assets/logo.png";

import control from "../assets/control.png";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Home" },
    { title: "Conquistas" },
    { title: "Dados" },
    { title: "Disciplinas" },

  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } min-h-screen bg-dark-purple relative duration-300 p-6 pt-8`}
    >
      {open ? (
        <img
          src={control}
          className={`absolute duration-300 cursor-pointer rounded-full top-9 w-7 border-2 border-dark-purple right-3 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <HiMenu
          className="w-10 text-white h-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}

      <div>
        {open ? (
          <a href="/home">
            <img
              src={logo}
              alt="logo maisEducação"
              className={`cursor-pointer duration-500 w-40`}
            />
          </a>
        ) : null}
      </div>
      <ul className="pt-5 p-6 flex items-start flex-col">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className="text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
          >
            <a
              className={`${!open && "hidden"} origin-left duration-200`}
              href={`/${menu.title}`}
            >
              {menu.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
