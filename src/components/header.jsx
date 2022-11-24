import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../assets/logo.png";

export function Header() {
  return (
    <div className="relative">
      <div className="w-full h-16 bg-dark-purple">
        <div className="flex flex-row justify-between items-center p-4">
          <a href="/home">
            <img
              src={logo}
              alt="logo maisEducação"
              className={`cursor-pointer duration-500 w-40`}
            />
          </a>
          <div className="flex flex-row text-white">
            <IoMdPerson className="mr-4" />

            <MdOutlineNotifications className="mr-4" />

            <IoMdExit />
          </div>
        </div>
      </div>
    </div>
  );
}
