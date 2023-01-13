import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { app } from "../../api/app";
import { ItemAulaEdit } from "./items/ItemAulaEdit";
import { ItemAtivEdit } from "./items/ItemAtivEdit";
import { ItemContEdit } from "./items/ItemContEdit";

import EyesCloked from "../../assets/hidden.png";
import EyesOpen from "../../assets/view.png";
import { Header } from "../../components/header";
import { ModalComponent } from "../../components/Modalcomponent";
import { ModalCancelarConteudo } from "./ModalCancelarConteudo";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EditAula() {
  const { user } = useContext(AuthContext);
  const { idSerie, idDisc, idConteudo } = useParams();
  const [aula, setAula] = useState([]);
  const [bimestre, setBimestre] = useState([]);
  const [bimestreId, setBimestreId] = useState(null);
  const [ready, setReady] = useState(true);
  const [clicked, setClicked] = useState(true);
  const [clicked2, setClicked2] = useState(true);

  const [disc, setDisc] = useState();
  const [valorBimestre, setValorBimestre] = useState("");
  const [nameConteudo, setNameConteudo] = useState("");
  const [newConteudo, setNewConteudo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/bimestres/`);
      setBimestre(response.data["bimestres"]);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${idDisc}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, [idDisc]);

  useEffect(() => {
    const getConteudos = async () => {
      const response = await app.get(
        `/conteudos/${idConteudo}/${idSerie}/${idDisc}`
      );

      setAula(response.data["conteudo"]);
      // setNewConteudo()
      setNameConteudo(response.data["conteudo"][1]["items"].name);
      setValorBimestre(response.data["conteudo"][1]["items"].id_bimestre);
      setBimestreId(response.data["conteudo"][1]["items"].id_bimestre);
      setNewConteudo(response.data["conteudo"][1]["items"].array_conteudos);
    };
    getConteudos();
  }, []);

  function switchEyes() {
    setClicked(!clicked);
  }
  function switchEyesGlobal(e) {
    e.preventDefault();
    setClicked2(!clicked2);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
    }
  }, []);

  const notify = () => toast("Wow so easy!");

  async function AttAula() {
    try {
      await app.put(`/conteudos/${idConteudo}`, {
        name: nameConteudo,
        id_disciplina: idDisc,
        id_serie: idSerie,
        created_by: user,
        array_conteudos: newConteudo,
        id_bimestre: bimestreId,
        status: true,
      });
      // notify();
      alert("Conteudo editado!");
      navigate(-1);
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
      document.location.reload(true);
    }
  }

  const AulasToConteudo = (id, type) => {
    const Valores = { id, type };
    setNewConteudo([...newConteudo, Valores]);
  };

  const ConteudoToAulas = (id) => {
    const Valores = { id };
    setNewConteudo(newConteudo.filter((index) => index.id !== Valores.id));
  };

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = aula;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items.array_conteudos[
        re.source.index
      ];
    newBoardData[parseInt(re.source.droppableId)].items.array_conteudos.splice(
      re.source.index,
      1
    );
    newBoardData[
      parseInt(re.destination.droppableId)
    ].items.array_conteudos.splice(re.destination.index, 0, dragItem);

    // Coluna 0: Aulas
    // Coluna 1: Conteudo = junção de tudo
    // Coluna 2: Atividades
    // Coluna 3: Materiais

    if (re.source.droppableId == 0 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "aula");
    } else if (re.source.droppableId == 2 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "atividade");
    } else if (re.source.droppableId == 3 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "material");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 0) {
      ConteudoToAulas(dragItem.id, "aula");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 2) {
      ConteudoToAulas(dragItem.id, "atividade");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 3) {
      ConteudoToAulas(dragItem.id, "material");
    } else {
    }
  };

  return (
    <div className="flex flex-col w-full h-full text-2xl bg-dark-theme relative">
      <Header />

      <div className="flex flex-row">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex relative w-full">
              {aula.map((board, bIndex) => (
                <div key={board.name}>
                  <Droppable droppableId={bIndex.toString()}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`
                          ${
                            board.name == "aulas"
                              ? "bg-dark-purple w-[300px] h-screen select-none scrollbar-thin"
                              : "0"
                          }
                          ${
                            board.name == "conteudos"
                              ? `h-[40rem] w-[60rem] mt-6 flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-20 scrollbar-thin `
                              : "0"
                          }
                          ${
                            board.name == "atividades"
                              ? `absolute top-0 right-0 w-[350px] h-1/2 bg-dark-purple select-none scrollbar-thin`
                              : "0"
                          }
                          ${
                            board.name == "materiais"
                              ? `absolute bottom-0 right-0 w-[350px] h-1/2 bg-dark-purple select-none scrollbar-thin`
                              : "0"
                          }
                          `}
                      >
                        <div className="flex justify-center">
                          <div className="text-[22px] text-[#FFFFFF] font-roboto mb-4">
                            <p>
                              {board.name == "aulas" ? `Vídeo Aulas` : ""}
                              {board.name == "atividades" ? `Atividades` : ""}
                              {board.name == "materiais" ? `Materiais` : ""}
                            </p>
                          </div>

                          {board.name === "conteudos" ? (
                            <div className="w-full relative">
                              <div>
                                <div className="w-full bg-gradient-to-r from-[#3B5BDB] to-[#BAC8FD] rounded-t-lg">
                                  <div className="flex justify-between py-4 px-5 items-center ">
                                    <p className="text-[#FFFFFF] text-[20px] font-rubik">
                                      {disc.name}
                                    </p>
                                    <div className="w-[180px] flex justify-between items-center flex-row ">
                                      <ModalCancelarConteudo salvar={AttAula} />
                                      <button
                                        className="py-[2px] px-[15px] bg-[#3B5BDB] rounded-md text-white text-[14px]"
                                        type="submit"
                                        onClick={AttAula}
                                      >
                                        Salvar
                                      </button>
                                      <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="light"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col p-8 w-full ">
                                <div className="flex flex-row justify-between">
                                  <input
                                    placeholder="Título do conteudo"
                                    className="bg-[#EDF2FF] rounded-lg border-none text-[16px] text-[#131313] font-roboto mb-4 p-1 pl-4 w-1/3 outline-none placeholder:text-[14px] font-light"
                                    type="text"
                                    value={nameConteudo}
                                    onChange={(e) =>
                                      setNameConteudo(e.target.value)
                                    }
                                  />

                                  <div className=" rounded-lg w-[200px] mb-5 flex justify-center text-zinc-700">
                                    <select
                                      className="text-[14px] w-[200px] border-none outline-none"
                                      onChange={(e) =>
                                        setBimestreId(e.target.value)
                                      }
                                      defaultValue={valorBimestre}
                                    >
                                      <option
                                        value="none"
                                        className="text-[12px]"
                                      >
                                        Selecione o bimestre
                                      </option>
                                      {bimestre.map((bim) => {
                                        return valorBimestre == bim.id ? (
                                          <option key={bim.id} value={bim.id}>
                                            {bim.number}
                                          </option>
                                        ) : (
                                          <option key={bim.id} value={bim.id}>
                                            {bim.number}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                  {clicked2 ? (
                                    <button
                                      className="w-[25px] h-[25px]"
                                      onClick={switchEyesGlobal}
                                    >
                                      <img
                                        className="w-[25px] h-[25px]"
                                        src={EyesOpen}
                                        alt=""
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={switchEyesGlobal}
                                      className="w-[25px] h-[25px]"
                                    >
                                      <img
                                        className="w-[25px] h-[25px]"
                                        src={EyesCloked}
                                        alt=""
                                      />
                                    </button>
                                  )}
                                </div>

                                {board.items.length == 0 && (
                                  <div className="bg-[#EDF2FF] h-[150px] rounded-lg mb-4 p-1 pl-4 flex items-center justify-center">
                                    <p className="text-center text-[#707070] text-[18px] font-roboto">
                                      Nenhuma aula cadastrada
                                    </p>
                                  </div>
                                )}

                                {board.name == "conteudos"
                                  ? board.items.array_conteudos.length > 0 &&
                                    board.items.array_conteudos.map(
                                      (item, iIndex) => {
                                        return (
                                          <div
                                            key={iIndex}
                                            className="bg-[#EDF2FF] rounded-lg p-4"
                                          >
                                            <div className="flex flex-row items-center">
                                              <div className="w-1/3 flex items-center">
                                                <ItemContEdit
                                                  key={item.id}
                                                  data={item}
                                                  index={iIndex}
                                                />
                                              </div>
                                              <div>
                                                <p className="text-[#343434] text-[16px] font-semibold">
                                                  {item.title}
                                                </p>
                                              </div>
                                              <div>
                                                {clicked ? (
                                                  <button
                                                    className="w-[25px] h-[25px] ml-4"
                                                    onClick={() => switchEyes()}
                                                  >
                                                    <img
                                                      src={EyesOpen}
                                                      alt=""
                                                      className="w-[25px] h-[25px]"
                                                    />
                                                  </button>
                                                ) : (
                                                  <button
                                                    className="w-[25px] h-[25px] ml-4"
                                                    onClick={() => switchEyes()}
                                                  >
                                                    <img
                                                      className="w-[25px] h-[25px]"
                                                      src={EyesCloked}
                                                      alt=""
                                                    />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )
                                  : ""}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        {board.name == "atividades" ? (
                          <div className="flex justify-center text-dark-purple">
                            <ModalComponent />
                          </div>
                        ) : (
                          ""
                        )}

                        {board.name == "aulas"
                          ? board.items.array_conteudos.length > 0 &&
                            board.items.array_conteudos.map((item, iIndex) => {
                              return (
                                <div key={iIndex} className="flex items-center justify-center">
                                  {/* <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1 mb-8" /> */}
                                  <ItemAulaEdit
                                    key={item.id}
                                    data={item}
                                    index={iIndex}
                                  />
                                </div>
                              );
                            })
                          : ""}

                        {board.name == "atividades"
                          ? board.items.array_conteudos.length > 0 &&
                            board.items.array_conteudos.map((item, iIndex) => {
                              console.log(item)
                              return (
                                <div key={iIndex} className="flex items-center justify-center">
                                  <ItemAtivEdit
                                    key={item.id}
                                    data={item}
                                    index={iIndex}
                                    idAtividade={item.id}
                                  />
                                </div>
                              );
                            })
                          : ""}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
