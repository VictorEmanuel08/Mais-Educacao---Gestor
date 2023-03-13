import { Draggable } from "react-beautiful-dnd";
import MenuIcon from "@mui/icons-material/Menu";

export function ItemContEdit({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col justify-center items-center w-[250px] h-[150px] "
        >
          <div className="flex flex-row items-center active:opacity-50 ">
            <MenuIcon className="text-[#4263EB] active:text-[#263B4A] opacity-1 mr-1" />
            <img src={data.thumb} alt={data.title} className="rounded-lg" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
