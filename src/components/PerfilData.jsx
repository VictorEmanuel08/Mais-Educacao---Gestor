import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";
import professorIcon from "../assets/professor.png";
import { MessageChat } from "./MessageChat";
import ChatApp from "./ChatApp";

export default function PerfilData() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nameProf, setNameProf] = useState("");
  const [emailProf, setEmail] = useState("");
  const [matProf, setMatProf] = useState("");
  const [CPFProf, setCPFProf] = useState("");
  const [idProf, setIdProf] = useState("");

  function VaiParaChat() {
    navigate("/Chats");
  }

  useEffect(() => {
    app.get(`/escolas/users/professores/${user}`).then((response) => {
      setNameProf(response.data.professor.escola_user.name);
      setMatProf(response.data.professor.escola_user.mat);
      setEmail(response.data.professor.escola_user.email);
      setCPFProf(response.data.professor.escola_user.cpf);
      setIdProf(response.data.professor.escola_user);
    });
  });

  // console.log(idProf);

  return (
    <div className=" w-full px-5">
      <div className="w-full h-[300px] flex flex-row justify-between text-center py-8">
        <div className="w-[500px]">
          <div className="bg-dark-purple rounded-t-md shadow-md py-2 pt-2">
            <h2 className="text-center text-[16px] font-semibold text-[#FFF]">
              {nameProf ? nameProf : "Loading..."}
            </h2>
          </div>

          <div className="bg-white h-full w-full">
            <div className="flex flex-col justify-between relative">
              <div className="flex ml-[80px] mt-6">
                <div className="flex flex-row items-center mb-4">
                  <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                    E-mail:
                  </strong>
                  <p className="text-sm text-[#707070]">{emailProf}</p>
                </div>
              </div>

              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col mr-20">
                  <div className="flex flex-row items-center"></div>

                  <div className="flex flex-row items-center"></div>

                  <div className="flex flex-row items-center"></div>
                </div>

                <div className="flex flex-col w-[50%]">
                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Matr??cula:
                    </strong>
                    <p className="text-sm text-[#707070]">{matProf}</p>
                  </div>

                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      S??rie:
                    </strong>
                    <p className="text-sm text-[#707070]">2</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Disciplina:
                    </strong>
                    <p className="text-sm text-[#707070]">3</p>
                  </div>
                </div>

                <div className="flex flex-col pr-4 w-[50%]">
                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      CPF:
                    </strong>
                    <p className="text-sm text-[#707070]">{CPFProf}-01</p>
                  </div>

                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Turmas:
                    </strong>
                    <p className="text-sm text-[#707070]">6</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-32px] left-5">
                <img src={professorIcon} alt="" className="w-[60px] h-[60px]" />
              </div>
            </div>
          </div>
        </div>
        {/* <MessageChat /> */}
        <ChatApp />
      </div>
    </div>
  );
}
