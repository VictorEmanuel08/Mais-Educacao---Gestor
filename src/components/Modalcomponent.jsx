import React, { useEffect, useState } from "react";
import { app } from "../api/app";
import { useParams } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Checkbox } from "@mui/material";
import { ModalCancelar } from "./ModalCancelar";

export function ModalComponent() {
  const { idSerie, idDisc } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");

  const optionTipo = [
    { id: 1, nome: "Múltipla escolha", value: "objetiva" },
    { id: 2, nome: "Subjetiva", value: "subjetiva" },
  ];

  const [questions, setQuestions] = useState([
    {
      title_question: "",
      id_disciplina: idDisc,
      question_type: "objetiva",
      options: [{ description: "", is_correct: false }],
    },
  ]);

  async function AddAtiv() {
    try {
      await app.post("/atividades", {
        title: title,
        description: "Resolva as questões para ganhar pontos",
        id_serie: idSerie,
        id_disciplina: idDisc,
        questions: questions,
      });
      document.location.reload(true);
      alert("Atividade cadastrada!");
      console.log("atividade criada");
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

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].title_question = text;
    setQuestions(newQuestion);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].description = text;
    setQuestions(optionsQuestion);
  }

  function changeTipoQuestao(text, i) {
    var TypeQuestion = [...questions];
    TypeQuestion[i].question_type = text;
    setQuestions(TypeQuestion);
  }

  function handleChange(text, i, j) {
    var optionQuestionCorrect = [...questions];
    optionQuestionCorrect[i].options[j].is_correct = !checked;
    setQuestions(optionQuestionCorrect);
  }

  function ChangeFalse(text, i, j) {
    var optionQuestionCorrect = [...questions];
    optionQuestionCorrect[i].options[j].is_correct = checked;
    setQuestions(optionQuestionCorrect);
  }

  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
    }
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({ description: "", is_correct: false });
    } else {
    }

    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function addMoreQuestionField() {
    setQuestions([
      ...questions,
      {
        title_question: "",
        id_disciplina: "0edbbd06-e902-4714-a18e-ddd4dc82ddeb",
        question_type: "objetiva",
        options: [{ description: "", is_correct: false }],
      },
    ]);
  }

  function clearQuestion() {
    questions.pop();
    closeModal();
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function questionsUI() {
    return questions.map((ques, i) => (
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
                    required
                    placeholder="Pergunta"
                    value={ques.title_question}
                    onChange={(e) => {
                      changeQuestion(e.target.value, i);
                    }}
                    className="bg-[#EDF2FF] w-full h-fit placeholder-black outline-none text-black text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                  />
                </div>
                {ques.options.map((op, j) => (
                  <div key={j}>
                    <div>
                      <div className="flex flex-row items-center justify-between mt-2">
                        {ques.options[j].is_correct == false ? (
                          <div>
                            <Checkbox
                              className="cursor-pointer text-black"
                              checked={checked}
                              onChange={(e) => {
                                handleChange(e.target.value, i, j);
                              }}
                              required
                            />
                          </div>
                        ) : (
                          <div>
                            <Checkbox
                              required
                              className="cursor-pointer text-black"
                              checked={!checked}
                              onChange={(e) => {
                                ChangeFalse(e.target.value, i, j);
                              }}
                            />
                          </div>
                        )}
                        <textarea
                          required
                          type="text"
                          className="bg-[#EDF2FF] w-full h-[40px] text-black placeholder-black outline-none text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                          placeholder={`Alternativa ${j + 1}`}
                          value={ques.options[j].optionText}
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

                {ques.options.length < 5 ? (
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
          className="bg-white p-1 mb-4 rounded-lg w-full h-fit flex items-center justify-center"
        >
          <AddCircleIcon /> Nova Atividade
        </button>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
          className="flex flex-col bg-white w-2/5 h-4/5 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
        >
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Nova Atividade</p>
          </div>

          <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
            <input
              placeholder="Título"
              onChange={(e) => {
                setTitle(e.target.value);
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
            <div className="w-1/6 bg-[#EDF2FF] rounded-lg">
              <ModalCancelar
                data={questions}
                descartar={clearQuestion}
                salvar={AddAtiv}
              />
            </div>
            <button
              onClick={AddAtiv}
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
