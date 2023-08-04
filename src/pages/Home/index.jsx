import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { Sidebar } from "../../components/Sidebar";
import { ContentHome } from "../../components/ContentHome";
import socketServices from "../../util/socketServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
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

  useEffect(() => {
    socketServices.emit("teste_conquista", {
      id: 1,
    });
  }, []);

  return (
    <div className="flex w-full min-h-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className="text-2xl font-semibold flex-1 bg-dark-theme">
        <div className="flex flex-row w-full h-16 bg-dark-purple relative">
          <div className="absolute right-5 pt-5 text-white">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson />
              </li>
              <li className="pr-2">
              </li>
              <li className="pr-2">
                <button>
                  <IoMdExit
                    onClick={handleSubmit}
                    className="cursor-pointer"
                    alt="sair"
                  />
                </button>
                <ToastContainer />
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-row pt-5">
          <ContentHome />
        </div>
      </main>

      <aside></aside>
    </div>
  );
}