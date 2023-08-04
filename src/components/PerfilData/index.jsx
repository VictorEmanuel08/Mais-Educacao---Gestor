import { useContext, useEffect, useState } from "react";
import { app } from "../../api/app";
import { AuthContext } from "../../context/auth";
import professorIcon from "../../assets/professor.png";
import { ChatApp } from "../ChatApp";

export function PerfilData() {
  const { user } = useContext(AuthContext);
  const [nameProf, setNameProf] = useState("");
  const [emailProf, setEmail] = useState("");
  const [matProf, setMatProf] = useState("");
  const [CPFProf, setCPFProf] = useState("");
  const [numDisciplinas, setnumDisciplinas] = useState("");
  const [numSeries, setnumSeries] = useState("");
  const [numTurmas, setnumTurmas] = useState("");
  const [iconProfessor, setIconProfessor] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/escolas/users/professores/${user}`);
      setNameProf(response.data.professor.escola_user.name);
      setMatProf(response.data.professor.escola_user.mat);
      setEmail(response.data.professor.escola_user.email);
      setCPFProf(response.data.professor.escola_user.cpf);
      setIconProfessor(response.data.professor.escola_user.avatar);
      setnumDisciplinas(response.data.professor.num_disciplinas);
      setnumSeries(response.data.professor.num_series);
      setnumTurmas(response.data.professor.num_turmas);
    };
    getData();
  }, [user]);

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
                      Matrícula:
                    </strong>
                    <p className="text-sm text-[#707070]">{matProf}</p>
                  </div>

                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Série:
                    </strong>
                    <p className="text-sm text-[#707070]">{numSeries}</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Disciplina:
                    </strong>
                    <p className="text-sm text-[#707070]">{numDisciplinas}</p>
                  </div>
                </div>

                <div className="flex flex-col pr-4 w-[50%]">
                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      CPF:
                    </strong>
                    <p className="text-sm text-[#707070]">{CPFProf}</p>
                  </div>

                  <div className="flex flex-row items-center mb-4">
                    <strong className="text-[16px] font-semibold text-[#4263EB] px-4">
                      Turmas:
                    </strong>
                    <p className="text-sm text-[#707070]">{numTurmas}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-32px] left-5">
                {iconProfessor != null ? (
                  <img
                    src={iconProfessor}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full"
                  />
                ) : (
                  <img
                    src="https://www.shutterstock.com/image-vector/white-add-friend-icon-isolated-260nw-1583760175.jpg"
                    alt=""
                    className="w-[60px] h-[60px] rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ChatApp />
      </div>
    </div>
  );
}
