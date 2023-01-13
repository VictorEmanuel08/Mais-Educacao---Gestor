import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { ModalcomponentEditarAtividade } from "../../../components/ModalcomponentEditarAtividade";

export function ItemAtivEdit({ data, index, idAtividade }) {
  const navigate = useNavigate();

  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div className="flex flex-row">
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex flex-col w-[200px] h-[130px] rounded-lg bg-white mb-4 mr-1"
          >
            <div className="flex items-center justify-center rounded-lg bg-white w-full h-[100px]">
              <a>
                <img src={data.thumb} className="rounded-lg w-[120px] h-full" />
              </a>
            </div>
            <div className="bg-[#EDF2FF] w-full h-[41px] rounded-b-lg">
              <p className="text-[14px] text-[#474747] leading-4 px-3 py-1">
                {data.title}
              </p>
            </div>
          </div>
          <div
            className="flex object-top"
          >
            <ModalcomponentEditarAtividade itemIdAtividade={idAtividade} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
