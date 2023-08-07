import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { Sidebar } from "../../components/Sidebar";
import { ContentOverviewDisciplinas } from "../../components/ContentOverviewDisciplinas";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function OverviewDisciplinas() {
  const navigate = useNavigate();

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

  function goToPerfil() {
    navigate("/home");
  }

  return (
    <div className="flex w-full min-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="absolute right-5 pt-5 text-white">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson onClick={goToPerfil} />
              </li>
              <li className="pr-2"></li>
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
        <div className="flex pt-6">
          <ContentOverviewDisciplinas />
        </div>
      </main>
    </div>
  );
}
