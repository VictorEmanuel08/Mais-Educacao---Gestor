import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

export function ModalEvent() {
  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [dataEvent, setDataEvent] = useState([]);
  const [inicioDateTime, setInicioDateTime] = useState([]);
  const [fimDateTime, setFimDateTime] = useState([]);
  const [nameDisc, setNameDisc] = useState("");
  const [nameSerie, setNameSerie] = useState("");
  const [nameTurma, setNameTurma] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/dados/${user}`);

      setDados(response.data);
    };
    getData();
  }, []);

  async function enviarLembrete() {
    try {
      await app.post(`/lembretes`, {
        title: titleEvent,
        data: `${dataEvent}T00:00:00.000Z`,
        start: `${dataEvent}T${inicioDateTime}.000z`,
        end: `${dataEvent}T${fimDateTime}.000z`,
        id_professor: user,
        id_disciplina: nameDisc,
        id_serie: nameTurma,
        id_turma: nameTurma,
      });
      alert("Lembrete criado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
      document.location.reload(true);
    }
  }

  const [indexDisc, setIndexDisc] = useState(-1);
  const [indexSerie, setIndexSerie] = useState(-1);
  const [indexTurma, setindexTurma] = useState(-1);

  function mudançaindexDisc(disc) {
    setIndexDisc(disc);
    setIndexSerie(-1);
    setindexTurma(-1);
    setNameDisc(dados[disc].disciplinas.id);
  }

  function mudançaindexSerie(serie) {
    setIndexSerie(serie);
    setindexTurma(-1);
    setNameSerie(dados[indexDisc].disciplinas.series[serie].id);
  }

  function mudançaindexTurma(turma) {
    setindexTurma(turma);
    setNameTurma(
      dados[indexDisc].disciplinas.series[indexSerie].turmas[turma].id
    );
  }

  useEffect(() => {
    setIndexSerie(-1);
    setindexTurma(-1);
  }, [indexDisc]);

  useEffect(() => {
    setindexTurma(-1);
  }, [indexSerie]);

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
        onRequestClose={closeModal}
        overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
        className="flex flex-col bg-white w-1/3 h-2/4 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
      >
        <div className="flex items-center justify-center">
          <p className="text-[25px] font-semibold">Novo evento</p>
        </div>

        <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
          <input
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
              <p className="text-[20px]">Início do evento:</p>
              <input
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
                  mudançaindexDisc(e.target.value);
                }}
                id="disciplina"
              >
                <option value={-1}>Selecione uma disciplina:</option>

                {Object.entries(dados).map((item, i) => {
                  return (
                    <option key={"disciplina" + i} value={i}>
                      {item[1].disciplinas.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB] py-4">
              <p className="text-[20px] font-semibold">Série</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                // onClick={handleCarregarSerie}
                onChange={(e) => {
                  mudançaindexSerie(e.target.value);
                }}
                name="serie"
              >
                <option value={-1}>Selecione uma série:</option>
                {indexDisc > -1 &&
                  dados[indexDisc].disciplinas.series.map((item, i) => {
                    return (
                      <option key={"serie" + i} value={i}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB] py-4">
              <p className="text-[20px] font-semibold">Turma</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                // onClick={handleCarregarTurma}
                onChange={(e) => {
                  mudançaindexTurma(e.target.value);
                }}
                name="turma"
              >
                <option value={-1}>Selecione uma turma:</option>
                {indexSerie > -1 &&
                  dados[indexDisc].disciplinas.series[indexSerie].turmas.map(
                    (item, i) => {
                      return (
                        <option key={"turma" + i} value={i}>
                          {item.name}
                        </option>
                      );
                    }
                  )}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end my-4 px-4 w-full">
          <button className="w-1/5 h-full bg-dark-purple rounded-lg text-white mr-2">
            Cancelar
          </button>
          <button
            onClick={enviarLembrete}
            className="bg-dark-purple rounded-lg text-white w-1/5 h-[40px] ml-4"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}
