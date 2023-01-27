import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import { Sidebar } from "../../components/Sidebar";
import { ContentDisciplinas } from "../../components/ContentDisciplinas";
import { useNavigate } from "react-router-dom";

export function Disciplinas() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    logout();
  };
  
  function goToPerfil() {
    navigate("/home");
  }

  return (
    <div className="flex w-full min-h-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="absolute right-5 pt-5 text-white">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson onClick={goToPerfil} className="cursor-pointer"/>
              </li>
              <li className="pr-2">
                <MdOutlineNotifications />
              </li>
              <li className="pr-2">
                <IoMdExit onClick={handleSubmit} className="cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex pt-6 flex-row justify-between">
          <ContentDisciplinas />
        </div>
      </main>
    </div>
  );
}
