import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

export function ModalEvent() {
  const { user } = useContext(AuthContext);
  const [disciplinas, setDisciplinas] = useState("");
  const [series, setSeries] = useState("");
  const [turmas, setTurmas] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dataEvent, setDataEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
  const [idDisc, setIdDisc] = useState("");
  const [idSerie, setIdSerie] = useState("");
  const [idTurma, setIdTurma] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas`);

      setDisciplinas(response.data.disciplinas);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/series`);

      setSeries(response.data.series);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/turmas`);

      setTurmas(response.data.turmas);
    };
    getData();
  }, []);

  async function enviarLembrete() {
    try {
      await app.post(`/lembretes`, {
        title: titleEvent,
        description: descriptionEvent,
        data: `${dataEvent} 00:00`,
        start: `${dataEvent} ${inicioDateTime}`,
        end: `${dataEvent} ${fimDateTime}`,
        id_professor: user,
        id_disciplina: idDisc,
        id_serie: idSerie,
        id_turma: idTurma,
      });
      alert("Lembrete criado!");
      document.location.reload(true);
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
      document.location.reload(true);
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center mt-4 rounded-lg bg-[#FFFFFF] w-full h-12 text-[#4263EB]"
      >
        <AddIcon className="font-bold" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
        className="flex flex-col bg-white w-1/3 h-3/5 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
      >
        <form>
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Novo lembrete</p>
          </div>

          <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
            <input
              required
              placeholder="Título"
              onChange={(e) => {
                setTitleEvent(e.target.value);
              }}
              className="w-fit placeholder-dark-purple outline-none text-[25px]"
            />
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col text-dark-purple py-4">
                <textarea
                  required
                  placeholder="Descrição"
                  onChange={(e) => {
                    setDescriptionEvent(e.target.value);
                  }}
                  className="w-fit h-fit placeholder-dark-purple outline-none text-[20px] scrollbar-thin resize-none"
                />
              </div>

              <div className="flex flex-col text-dark-purple py-4">
                <p className="text-[20px]">Data do evento:</p>
                <input
                  required
                  type="date"
                  onChange={(e) => {
                    setDataEvent(e.target.value);
                  }}
                  className="w-fit placeholder-dark-purple outline-none text-[18px]"
                />
              </div>

              <div className="flex flex-col text-dark-purple py-4">
                <p className="text-[20px]">Início do evento:</p>
                <input
                  required
                  type="time"
                  onChange={(e) => {
                    setInicioDateTime(e.target.value);
                  }}
                  className="w-fit placeholder-dark-purple outline-none text-[18px]"
                />
              </div>

              <div className="flex flex-col text-dark-purple py-4">
                <p className="text-[20px]">Fim do evento:</p>
                <input
                  required
                  type="time"
                  onChange={(e) => {
                    setFimDateTime(e.target.value);
                  }}
                  className="w-fit placeholder-dark-purple outline-none text-[18px]"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-col text-[#4263EB] py-4">
                <p className="text-[20px] font-semibold">Disciplina</p>
                <select
                  className="bg-[#FFFFFF] text-[16px]"
                  onChange={(e) => {
                    setIdDisc(e.target.value);
                  }}
                  id="disciplina"
                  required
                >
                  <option value="">Selecione uma disciplina:</option>

                  {Object.entries(disciplinas).map((item, i) => {
                    return (
                      <option key={"disciplina" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col text-[#4263EB] py-4">
                <p className="text-[20px] font-semibold">Série</p>
                <select
                  className="bg-[#FFFFFF] text-[16px]"
                  onChange={(e) => {
                    setIdSerie(e.target.value);
                  }}
                  name="serie"
                  required
                >
                  <option value="">Selecione uma série:</option>
                  {Object.entries(series).map((item, i) => {
                    return (
                      <option key={"serie" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col text-[#4263EB] py-4">
                <p className="text-[20px] font-semibold">Turma</p>
                <select
                  className="bg-[#FFFFFF] text-[16px]"
                  onChange={(e) => {
                    setIdTurma(e.target.value);
                  }}
                  name="turma"
                  required
                >
                  <option value="">Selecione uma turma:</option>
                  {Object.entries(turmas).map((item, i) => {
                    return (
                      <option key={"turma" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end my-4 px-4 w-full">
            <button className="w-1/5 h-full bg-[#EDF2FF] rounded-lg text-black mr-2 ">
              Cancelar
            </button>
            <button
              type="submit"
              onClick={enviarLembrete}
              className="bg-dark-purple rounded-lg text-white w-1/5 h-[40px] ml-4"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
