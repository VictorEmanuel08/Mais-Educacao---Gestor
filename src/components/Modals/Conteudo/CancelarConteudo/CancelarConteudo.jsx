import { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";

export function CancelarConteudo({ salvar }) {
  const { idSerie, idDisc } = useParams();
  const [cancelarIsOpen, setCancelarIsOpen] = useState(false);

  function openCancelar() {
    setCancelarIsOpen(true);
  }

  function closeCancelar() {
    setCancelarIsOpen(false);
  }

  function atualizar() {
    salvar();
  }

  return (
    <div className="">
      <button
        onClick={openCancelar}
        className="py-[2px] px-[15px] text-[14px] bg-[#FFFFFF] rounded-md"
      >
        Cancelar
      </button>
      <Modal
        isOpen={cancelarIsOpen}
        onRequestClose={closeCancelar}
        overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
        className="flex flex-col bg-white w-1/5 h-1/6 rounded-lg place-content-between p-3 font-poppins text-[14px]"
      >
        <div className="flex justify-center items-center ">
          <p className="text-[18px]">Deseja sair sem salvar?</p>
        </div>
        <div className="flex flex-row w-full h-[40px] items-center ">
          <button
            className="w-1/2 h-full bg-dark-purple rounded-lg text-white mr-2"
            onClick={atualizar}
          >
            <a href={`/view-disciplinas/${idSerie}/${idDisc}`}>Salvar</a>
          </button>
          <button className="w-1/2 h-full bg-[#D1DEFE] rounded-lg">
            <a href={`/view-disciplinas/${idSerie}/${idDisc}`}>
              Descartar alterações
            </a>
          </button>
        </div>
      </Modal>
    </div>
  );
}