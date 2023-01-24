import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";
import EditIcon from "@mui/icons-material/Edit";

export function ModalEventEdit({ eventId }) {
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dataEvent, setDataEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
  const [disciplinas, setDisciplinas] = useState("");
  const [series, setSeries] = useState("");
  const [turmas, setTurmas] = useState("");
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

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/lembretes/${eventId}`);
      setTitleEvent(response.data.lembrete.title);
      setDescriptionEvent(response.data.lembrete.description);
      setDataEvent(response.data.lembrete.data);
      setInicioDateTime(response.data.lembrete.start.slice(0, 5));
      setFimDateTime(response.data.lembrete.end.slice(0, 5));
      setIdDisc(response.data.lembrete.id_disciplina);
      setIdSerie(response.data.lembrete.turma.id_serie);
      setIdTurma(response.data.lembrete.turma.id);
    };
    getData();
  }, []);

  async function enviarLembrete() {
    try {
      await app.put(`/lembretes/${eventId}`, {
        title: titleEvent,
        description: descriptionEvent,
        data: `${dataEvent} 00:00`,
        start: `${dataEvent} ${inicioDateTime}:00`,
        end: `${dataEvent} ${fimDateTime}:00`,
        id_professor: user,
        id_disciplina: idDisc,
        id_serie: idSerie,
        id_turma: idTurma,
      });
      alert("Lembrete editado!");
      document.location.reload(true);
    } catch (erro) {
      alert(erro.message);
      document.location.reload(true);
    }
  }


  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  const teste = dataEvent + "";

  const [day, month, year] = teste.split("/");
  const date = new Date(year, month - 1, day);

  var date1 = new Date(date);

  let dataAtualFormatada =
    date1.getFullYear() +
    "-" +
    adicionaZero(date1.getMonth() + 1).toString() +
    "-" +
    adicionaZero(date1.getDate().toString());

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center justify-center  text-[#4263EB]"
      >
        <EditIcon className="text-[#748FFC] " />
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
            <p className="text-[25px] font-semibold">Editar lembrete</p>
          </div>

          <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
            <input
              required
              placeholder="Título"
              value={titleEvent}
              onChange={(e) => {
                setTitleEvent(e.target.value);
              }}
              className="w-fit placeholder-dark-purple outline-none text-[25px]"
            />
          </div>

          <div className="flex flex -row">
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col text-dark-purple py-4">
                <textarea
                  required
                  placeholder="Descrição"
                  value={descriptionEvent}
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
                  defaultValue={dataAtualFormatada}
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
                  value={inicioDateTime}
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
                  value={fimDateTime}
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
                  value={idDisc}
                >
                  <option value={-1}>Selecione uma disciplina:</option>

                  {Object.entries(disciplinas).map((item, i) => {
                    return idDisc === item[1].id ? (
                      <option key={"disciplina" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    ) : (
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
                  name="serie"
                  onChange={(e) => {
                    setIdSerie(e.target.value);
                  }}
                  value={idSerie}
                >
                  <option value={-1}>Selecione uma série:</option>
                  {Object.entries(series).map((item, i) => {
                    return idSerie === item[1].id ? (
                      <option key={"serie" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    ) : (
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
                  name="turma"
                  onChange={(e) => {
                    setIdTurma(e.target.value);
                  }}
                  value={idTurma}
                >
                  <option value={-1}>Selecione uma turma:</option>
                  {Object.entries(turmas).map((item, i) => {
                    return idTurma === item[1].id ? (
                      <option key={"serie" + i} value={item[1].id}>
                        {item[1].name}
                      </option>
                    ) : (
                      <option key={"serie" + i} value={item[1].id}>
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
