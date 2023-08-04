import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import { app } from "../../../../api/app";
import { AuthContext } from "../../../../context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CriarLembrete() {
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

  const notify = () => {
    toast.success("Lembrete criado!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
      notify();
      setTimeout(() => {
        window.location.reload(true);
      }, 2100);
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
      window.location.reload(true);
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function clearLembrete() {
    setTitleEvent("");
    setDescriptionEvent("");
    setDataEvent("");
    setInicioDateTime("");
    setFimDateTime("");
    setIdDisc("");
    setIdSerie("");
    setIdTurma("");
    alert("Lembrete cancelado!");
    closeModal();
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
          <button
            onClick={clearLembrete}
            className="bg-[#EDF2FF] rounded-lg text-black w-1/5 h-[40px] ml-4"
          >
            Cancelar
          </button>

          {titleEvent.length === 0 ||
          descriptionEvent.length === 0 ||
          dataEvent.length === 0 ||
          inicioDateTime.length === 0 ||
          fimDateTime.length === 0 ||
          idDisc.length === 0 ||
          idSerie.length === 0 ||
          idTurma.length === 0 ? (
            <button
              disabled={true}
              className="bg-dark-purple rounded-lg text-white w-1/5 h-[40px] ml-4 cursor-not-allowed"
            >
              Salvar
            </button>
          ) : (
            <div className="w-1/5">
              <button
                onClick={enviarLembrete}
                className="bg-dark-purple rounded-lg text-white w-full h-[40px] ml-4"
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}