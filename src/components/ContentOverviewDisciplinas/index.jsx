import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../api/app";
import { AuthContext } from "../../context/auth";

export function ContentOverviewDisciplinas() {
  const { idSerie, idDisc } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [disc, setDisc] = useState("");
  const [conteudoArray, setConteudoArray] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${idDisc}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, []);

  useEffect(() => {
    try {
      if (user) {
        async function getConteudos() {
          const response = await app.get(
            `/escolas/users/professores/${user}/conteudos`
          );
          setConteudoArray(response.data["conteudos"]);
        }
        getConteudos();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [user]);

  function EditarConteudo(idConteudo) {
    navigate(`/editar-disciplinas-conteudo/${idConteudo}/${idSerie}/${idDisc}`);
  }

  function CriarConteudo() {
    navigate(`/criar-disciplinas-conteudo/${idSerie}/${idDisc}`);
  }

  function HandleVerificar() {
    if (conteudoArray.length == 0) {
      return (
        <p className="text-[#707070] font-rubik">Nenhuma aula cadastrada</p>
      );
    } else {
      return conteudoArray?.map((conteudo) => {
        return (
          <button
            key={conteudo.id}
            className=" mt-2 bg-[#4263EB] rounded-lg px-4 mb-2"
            onClick={() => {
              EditarConteudo(conteudo.id);
            }}
          >
            <div
              key={conteudo.id}
              className="w-[250px] h-[120px] flex justify-center items-center"
            >
              <p className="text-white">{conteudo?.name}</p>
            </div>
          </button>
        );
      });
    }
  }

  return (
    <div className="w-full">
      <div className="w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12">
        <div className="w-full bg-gradient-to-r from-[#3B5BDB] to-[#BAC8FD] rounded-t-lg">
          <div className="flex justify-between py-4 px-5 items-center ">
            <p className="text-[#FFFFFF] text-[20px] font-rubik">{disc.name}</p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center py-5 border-dashed border-b-2 border-[#4263EB] text-[16px]">
            <div className="w-[500px] flex flex-col justify-center items-center">
              {HandleVerificar()}
            </div>
          </div>
          <div className="w-[250px] py-5">
            <button
              className="w-full h-[45px] rounded-md text-sm text-white bg-[#4263EB]"
              onClick={() => CriarConteudo()}
            >
              Criar um novo conteúdo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
