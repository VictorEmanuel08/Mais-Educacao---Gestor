import React, { useEffect, useState } from "react";
import { app } from "../api/app";
import { useParams } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Checkbox } from "@mui/material";
import { ModalCancelar } from "./ModalCancelar";

export function ModalcomponentEditarAtividade({ itemIdAtividade }) {
  const { idSerie, idDisc } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");

  const optionTipo = [
    { id: 1, nome: "Múltipla escolha", value: "objetiva" },
    { id: 2, nome: "Subjetiva", value: "subjetiva" },
  ];

  const [questions, setQuestions] = useState([]);

  const [atividades, setAtividades] = useState([]);
  const [questionTypeEdit, setQuestionTypeEdit] = useState([])
  const [titleAtividade, setTitleAtividade] = useState("");
  const [questionsAtividade, setQuestionsAtividade] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // const response = await app.get(`/atividades/47de20bc-58d2-47e5-824f-057b7baddfff}`);
      const response = await app.get(`/atividades/${itemIdAtividade}/webView`);
      setAtividades(response.data.atividade);
      setTitleAtividade(response.data.atividade.title);
      setQuestionsAtividade(response.data.atividade.questoes);
      // setQuestions(response.data.atividade.questoes);
    };
    getData();
  }, []);

  function showItens() {
    // console.log(questionsAtividade);
  }

  async function EditAtiv() {
    try {
      console.log(questionsAtividade);
      console.log(itemIdAtividade)
      await app.put(`/atividades/${itemIdAtividade}`, {
        title: titleAtividade,
        description: "Resolva as questões para ganhar pontos",
        id_serie: idSerie,
        id_disciplina: idDisc,
        questoes: questionsAtividade,
      });
      document.location.reload(true);
      alert("Atividade cadastrada!");
      console.log("editado");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  console.log(questionsAtividade)

  function changeQuestion(text, i) {
    var newQuestion = [...questionsAtividade];
    newQuestion[i].questao.title = text;
    setQuestionsAtividade(newQuestion);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questionsAtividade];
    optionsQuestion[i].questao.opcao[j].description = text;
    setQuestionsAtividade(optionsQuestion);
  }

  function changeTipoQuestao(text, i) {
    var TypeQuestion = [...questionsAtividade];
    TypeQuestion[i].questao.question_type = text;
    setQuestionsAtividade(TypeQuestion);
    console.log(TypeQuestion)
  }

  function handleChange(text, i, j) {
    var optionQuestionCorrect = [...questionsAtividade];
    optionQuestionCorrect[i].questao.opcao[j].is_correct = !checked;
    setQuestionsAtividade(optionQuestionCorrect);
  }

  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questionsAtividade];
    if (RemoveOptionQuestion[i].questao.opcao.length > 1) {
      RemoveOptionQuestion[i].questao.opcao.splice(j, 1);
      setQuestionsAtividade(RemoveOptionQuestion);
    }
  }

  function addOption(i) {
    var optionsOfQuestion = [...questionsAtividade];
    if (optionsOfQuestion[i].questao.opcao.length < 5) {
      optionsOfQuestion[i].questao.opcao.push({
        description: "",
        is_correct: false,
      });
    } else {
    }
    setQuestionsAtividade(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questionsAtividade];
    if (questionsAtividade.length > 1) {
      qs.splice(i, 1);
    }
    setQuestionsAtividade(qs);
  }

  function addMoreQuestionField() {
    setQuestionsAtividade([
      ...questionsAtividade,
      {
        questao: {
        title: "",
        id_disciplina: idDisc,
        question_type: "objetiva",
        opcao: [{ description: "", is_correct: false }],
        },
      },
    ]);
  }

  function clearQuestion() {
    questionsAtividade.pop();
    closeModal();
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questionsAtividade];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestionsAtividade(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function questionsUI() {
    return questionsAtividade.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <MdDragIndicator
                style={{
                  transform: "rotate(-90deg)",
                  color: "#DAE0E2",
                  position: "relative",
                  left: "330px",
                }}
                fontSize="small"
              />
              <div>
                <div className="flex flex-row w-full justify-between items-center text-black">
                  <p className="mr-4 text-dark-purple text-[20px]">{i + 1})</p>

                  <div className="flex items-center h-[40px] w-1/3">
                    <DeleteForeverOutlinedIcon
                      sx={{ fontSize: 30 }}
                      onClick={() => deleteQuestion(i)}
                      className="cursor-pointer text-dark-purple mr-2"
                    />
                    <div className="bg-[#EDF2FF] w-full rounded-lg p-2 pr-4">
                      <select
                        className="bg-transparent w-full rounded-lg outline-none"
                        name="TipoDeQuestão"
                        onChange={(e) => {
                          changeTipoQuestao(e.target.value, i);
                        }}
                      >
                        {optionTipo.map((item) => (
                          <option key={item.id} value={item.value}>
                            {item.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-12 w-full h-[40px]">
                  <textarea
                    // placeholder={`${ques.questao.title}`}
                    placeholder="Pergunta"
                    defaultValue={ques.questao.title}
                    onChange={(e) => {
                      changeQuestion(e.target.value, i);
                    }}
                    className="bg-[#EDF2FF] w-full h-fit placeholder-black outline-none text-black text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                  />
                  {/* {console.log(ques.questao.title)} */}
                </div>
                {ques.questao.opcao.map((op, j) => (
                  <div className="add_question_body" key={j}>
                    <div>
                      <div className="flex flex-row items-center justify-between mt-2">
                        <Checkbox
                          className="cursor-pointer text-black"
                          defaultValue={ques.questao.opcao[j].is_correct}
                          onChange={(e) => {
                            handleChange(e.target.value, i, j);
                          }}
                        />
                        <textarea
                          type="text"
                          className="bg-[#EDF2FF] w-full h-[40px] text-black placeholder-black outline-none text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                          placeholder={`Alternativa ${j + 1}`}
                          defaultValue={ques.questao.opcao[j].description}
                          onChange={(e) => {
                            changeOptionValue(e.target.value, i, j);
                          }}
                        />
                        <CloseIcon
                          className="cursor-pointer text-dark-purple"
                          onClick={() => {
                            removeOption(i, j);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {ques.questao.opcao.length < 5 ? (
                  <div className="add_question_body">
                    <div className="h-[40px] mt-4 mb-4">
                      <button
                        onClick={() => addOption(i)}
                        className="flex items-center justify-center w-full h-full bg-dark-purple rounded-lg text-white "
                      >
                        <AddCircleOutlineIcon className="mr-4" />
                        Adicionar Alternativas
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="flex justify-center text-dark-purple">
        <button
          onClick={openModal}
          className="flex items-center justify-center"
        >
          <EditIcon
            className="text-[#EEF2FE]"
            onClick={() => {
              showItens(itemIdAtividade);
            }}
          />
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
          className="flex flex-col bg-white w-2/5 h-4/5 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
        >
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Editar Atividade</p>
          </div>

          <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
            <input
              placeholder="Título"
              defaultValue={titleAtividade}
              onChange={(e) => {
                setTitleAtividade(e.target.value);
              }}
              className="w-fit placeholder-dark-purple outline-none text-[25px]"
            />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center justify-center mt-2">
            <button
              onClick={addMoreQuestionField}
              className="flex items-center justify-center w-1/3 h-[40px] bg-dark-purple rounded-lg text-white"
            >
              Adicionar Questão
            </button>
          </div>
          <div className="flex flex-row items-center justify-end my-8 px-4 w-full">
            <ModalCancelar
              data={questionsAtividade}
              descartar={clearQuestion}
              salvar={EditAtiv}
            />
            <button
              onClick={EditAtiv}
              className="bg-dark-purple rounded-lg text-white w-1/6 h-[40px] ml-4"
            >
              Salvar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
