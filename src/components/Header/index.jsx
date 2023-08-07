import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import logo from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Header() {
  const { logout } = useContext(AuthContext);

  const notify = () => {
    toast.error("Deslogado!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    notify();
    setTimeout(() => {
      logout();
    }, 2500);
  };

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

            <button>
              <IoMdExit
                onClick={handleSubmit}
                className="cursor-pointer"
                alt="sair"
              />
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
