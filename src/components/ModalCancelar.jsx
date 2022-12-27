import react, { useState } from "react";
import Modal from "react-modal";

export function ModalCancelar({ data, descartar, salvar }) {
  const [cancelarIsOpen, setCancelarIsOpen] = useState(false);

  function openCancelar() {
    setCancelarIsOpen(true);
  }

  function closeCancelar() {
    setCancelarIsOpen(false);
  }

  function clearQuestion() {
    descartar();
  }

  function sendQuestions() {
    salvar();
  }


  return (
    <div className="">
      <button
        onClick={openCancelar}
        className="w-full bg-[#EDF2FF] rounded-lg text-black h-[40px]"
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
            onClick={sendQuestions}
            className="w-1/2 h-full bg-dark-purple rounded-lg text-white mr-2"
          >
            Salvar
          </button>
          <button
            onClick={clearQuestion}
            className="w-1/2 h-full bg-[#D1DEFE] rounded-lg"
          >
            Descartar alterações
          </button>
        </div>
      </Modal>
    </div>
  );
}
