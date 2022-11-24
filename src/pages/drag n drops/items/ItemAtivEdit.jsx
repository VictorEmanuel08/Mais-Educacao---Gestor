import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function ItemAtivEdit({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col justify-center items-center w-[200px] h-[100px] rounded-lg bg-white mb-4"
        >
          <p className="flex flex-col items-center active:opacity-50">
            {/* <MenuIcon className="text-[#4263EB] active:text-[#263B4A] opacity-1 mr-1" /> */}
            {data.title}
          </p>
        </div>
      )}
    </Draggable>
  );
}
